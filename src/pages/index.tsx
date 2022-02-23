import type { NextPage } from "next";
import type { QuizItem } from "src/types";

import { useEffect, useRef, useReducer } from "react";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { toast } from "react-toastify";

import { toastOptions } from "@constants/config";
import { createDispatcher, Dispatcher } from "@state/dispatcher";
import { dispatcherState } from "@state/atoms";
import { Box, Card, Grid, Stack, Heading } from "@components/system";
import { Button, Tag, Label } from "@components/atoms";
import { Checkbox } from "@components/molecules";
import { equals } from "@utils/index";

import { Checkmark } from "@components/atoms/Icon/icons";

type QuizAction =
  | { type: "nextQuestion" | "resetAnswers" }
  | { type: "setQuiz"; payload: QuizItem[] }
  | { type: "setAnswer"; payload: number }
  | { type: "setIsCorrect"; payload: boolean }
  | { type: "setButton"; payload: boolean }
  | { type: "setToastString" };

type Quiz = {
  questions: QuizItem[];
  playerAnswer: boolean[];
  index: number;
  isCorrect: boolean;
  buttonDisabled: boolean;
  toastString: string;
};

/**
 *
 * @param state
 * @param action
 * @returns updated state
 */
function quizReducer(state: Quiz, action: QuizAction) {
  switch (action.type) {
    case "setQuiz": {
      return {
        ...state,
        questions: action.payload,
        index: 0,
      };
    }
    case "nextQuestion": {
      return {
        ...state,
        index: state.index + 1,
      };
    }
    case "setAnswer": {
      return {
        ...state,
        playerAnswer: [
          ...state.playerAnswer.slice(0, action.payload),
          !state.playerAnswer[action.payload],
          ...state.playerAnswer.slice(action.payload + 1),
        ],
      };
    }
    case "setIsCorrect": {
      return {
        ...state,
        isCorrect: action.payload,
      };
    }
    case "resetAnswers": {
      return {
        ...state,
        playerAnswer: state.playerAnswer.map(() => {
          return false;
        }),
      };
    }
    case "setButton": {
      return {
        ...state,
        buttonDisabled: action.payload,
      };
    }
    case "setToastString": {
      return {
        ...state,
        toastString: "correct",
      };
    }
  }
}

// Initialize state for question
const initState: Quiz = {
  questions: [],
  playerAnswer: [false, false, false, false, false, false],
  index: 0,
  isCorrect: false,
  buttonDisabled: true,
  toastString: "",
};

const Home: NextPage = () => {
  // Init Router
  const router = useRouter();
  const { query } = router;

  // Init quiz state
  const [quizState, dispatch] = useReducer(quizReducer, initState);
  const { questions, index } = quizState;

  // Fetch date frin quiz-api
  const { data, refetch } = useQuery(
    "quiz",
    async () => {
      const response = await fetch(`https://quizapi.io/api/v1/questions`, {
        mode: "cors",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Api-Key": process.env.NEXT_PUBLIC_API_KEY,
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
    {
      enabled: false, // Turn of automatic refetching
    }
  );

  // Init recoil dispatcher state
  const setDispatcher = useSetRecoilState(dispatcherState);
  const dispatcher = useRecoilValue(dispatcherState);
  const dispatcherRef = useRef<Dispatcher>(createDispatcher());
  // Only runs on mount
  useEffect(() => {
    refetch();
    setDispatcher(dispatcherRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Runs after refetching from quiz-api
   * sets the quiz array
   */
  useEffect(() => {
    data &&
      dispatch({
        type: "setQuiz",
        payload: data.map((d: any) => {
          return {
            id: d.id,
            question: d.question,
            answers: Object.values(d.answers),
            multiple_correct_answers: d.multiple_correct_answers,
            correct_answers: Object.values(d.correct_answers).map((a) => {
              return a === "true";
            }),
            tags: d.tags,
            category: d.category,
            difficulty: d.difficulty,
          };
        }),
      });
  }, [data]);

  /**
   * Refetches when router query updates
   */
  useEffect(() => {
    if (quizState.index > 19) {
      refetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, quizState.index]);

  useEffect(() => {
    // If player hasn't entered answer then button is disabled else not
    quizState.playerAnswer.every((element) => {
      return element === false;
    })
      ? dispatch({ type: "setButton", payload: true })
      : dispatch({ type: "setButton", payload: false });
  }, [quizState.playerAnswer]);

  /**
   * submits answer
   */
  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch({
      type: "setIsCorrect",
      // Check if playerAnswer and correct_answer arrays are equal
      payload: equals(
        quizState.playerAnswer,
        quizState.questions[index].correct_answers
      ),
    });
    dispatcher?.incrementScore(quizState.isCorrect);
    dispatch({ type: "resetAnswers" });
    dispatch({ type: "nextQuestion" });

    console.log("herna");
    quizState.isCorrect
      ? toast.success(quizState.toastString, toastOptions)
      : toast.error(quizState.toastString, toastOptions);
  };

  return (
    <Grid
      gridGap={[4, null, 6]}
      gridTemplateColumns={[
        "repeat(1, 1fr)",
        "repeat(2, 1fr)",
        "repeat(3, 1fr)",
      ]}
    >
      {questions.length > 0 && (
        <Card
          key={questions[index].id}
          p={[2, null, 3]}
          boxShadow="m"
          bg="white"
          width="100%"
          borderRadius={8}
          overflow="hidden"
        >
          <Stack gap={[2, null, 6]}>
            <Stack gap={[1, null, 2]}>
              <Heading as="h3" fontSize={[2, null, 3]}>
                {questions[index].question}
              </Heading>
              <Label fontSize={[1, null, 2]}>
                Category: {questions[index].category}
              </Label>
              {questions[index]?.tags?.map((a: any, i: number) => (
                <Tag singleLine key={i}>
                  {a?.name}
                </Tag>
              ))}
            </Stack>
            <Stack gap={[3, null, 4]}>
              {questions[index].answers.map((a: string, i: number) => (
                <Box key={i}>
                  {a !== null && (
                    <Checkbox
                      label={a}
                      value={i}
                      name="test"
                      ml={[2, null, 4]}
                      checked={quizState.playerAnswer[i]}
                      onChange={() =>
                        dispatch({
                          type: "setAnswer",
                          payload: i,
                        })
                      }
                    />
                  )}
                </Box>
              ))}
            </Stack>
            <Checkmark color="blue" fontSize={100} />
            <Button disabled={quizState.buttonDisabled} onClick={handleSubmit}>
              Submit Answer
            </Button>
          </Stack>
        </Card>
      )}
    </Grid>
  );
};

export default Home;
