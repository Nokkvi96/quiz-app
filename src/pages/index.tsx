import type { NextPage } from "next";
import type { QuizItem } from "src/types";

import { useState, useEffect, useRef, useReducer } from "react";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { toast } from "react-toastify";

import { arrayEquals, useIsMount } from "@utils/index";
import { toastOptions } from "@constants/config";
import { createDispatcher, Dispatcher } from "@state/dispatcher";
import { dispatcherState } from "@state/atoms";
import { Card, Contain, Stack, Heading, Text } from "@components/system";
import { Button, Tag } from "@components/atoms";
import { RadioButtonGroup, CheckboxGroup } from "@components/molecules";

type QuizAction =
  | { type: "nextQuestion" | "setToastString" | "setIsCorrect" }
  | { type: "setQuiz"; payload: QuizItem[] }
  | { type: "setAnswer"; payload: string };

type Quiz = {
  questions: QuizItem[];
  playerAnswer: string[];
  index: number;
  isCorrect: boolean;
  buttonDisabled: boolean;
  toastString: string;
  nextQuestion: boolean;
};

/**
 *
 * @param state
 * @param action
 * @returns updated state
 */
function quizReducer(state: Quiz, action: QuizAction) {
  // Initializes quiz on refetch
  switch (action.type) {
    case "setQuiz": {
      return {
        ...state,
        questions: action.payload,
        index: 0,
      };
    }
    // increments index
    case "nextQuestion": {
      const i = state.index >= 19 ? 0 : state.index + 1;
      return {
        ...state,
        index: i,
      };
    } // Sets player answer if it was already selected then it deselects else selects
    case "setAnswer": {
      const answerArray =
        state.questions[state.index].multiple_correct_answers === true
          ? // If multiple_correct_answer we run this
            state.playerAnswer.find((element) => element === action.payload)
            ? // If action.payload is already present we remove it
              state.playerAnswer.filter((element) => element !== action.payload)
            : // else we append it
              [...state.playerAnswer, action.payload]
          : // If !multiple correct we return action.payload only
            [action.payload];
      console.log(answerArray);
      return {
        ...state,
        playerAnswer: answerArray,
        buttonDisabled: answerArray.length > 0 ? false : true,
      };
    }
    case "setIsCorrect": {
      // Creates array with all the correct answers
      const correctAnswersString: string[] = state.questions[
        state.index
      ].answers.filter((q, i) => {
        if (state.questions[state.index].correct_answers[i]) return q;
      });
      // sets if correct and prepares next question
      return {
        ...state,
        // Checks if correctAnswerString array is equals to playerAnswer array
        isCorrect: arrayEquals(correctAnswersString, state.playerAnswer),
        toastString: "Correct answer is: ".concat(
          correctAnswersString.join(" AND ")
        ),
        // resets answer,
        playerAnswer: [],
        // triggers next question and disables button
        nextQuestion: !state.nextQuestion,
        buttonDisabled: true,
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

const buildQueryString = (
  category: string | undefined,
  difficulty: string | undefined
) => {
  let string = "https://quizapi.io/api/v1/questions";
  if (category) string = string.concat(`?category=${category}`);
  if (difficulty) string.concat(`?difficulty=${difficulty}`);
  return string;
};

// Initialize state for question
const initState: Quiz = {
  questions: [],
  playerAnswer: [],
  index: 0,
  isCorrect: false,
  buttonDisabled: true,
  toastString: " ",
  nextQuestion: false,
};

const Home: NextPage = () => {
  const isMount = useIsMount();
  // Init Router
  const router = useRouter();
  const { query } = router;

  // Init quiz state
  const [quizState, dispatch] = useReducer(quizReducer, initState);
  const { questions, index } = quizState;
  const [queryString, setQueryString] = useState(
    "https://quizapi.io/api/v1/questions"
  );

  // Fetch data from quiz-api with react-query
  const { data, refetch } = useQuery(
    "quiz",
    async () => {
      const response = await fetch(queryString, {
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
            multiple_correct_answers: d.multiple_correct_answers === "true",
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
    // @ts-ignore
    setQueryString(buildQueryString(query.category, ""));
  }, [query.category]);
  useEffect(() => {
    if (!isMount || (!query.category && router.isReady)) {
      refetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryString]);

  /**
   * submits answer
   */
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    dispatch({
      type: "setIsCorrect",
    });
  };

  /**
   * dispatches new question
   * and displays toast
   */
  useEffect(() => {
    quizState.index > 19 && refetch();
    dispatch({ type: "nextQuestion" });
    if (!isMount) {
      dispatcher?.incrementScore(quizState.isCorrect);

      quizState.isCorrect
        ? toast.success(quizState.toastString, toastOptions)
        : toast.error(quizState.toastString, toastOptions);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quizState.nextQuestion]);

  return (
    <Contain fontSize={[3, null, 4]} maxWidth="40ch">
      {questions.length > 0 && (
        <form onSubmit={handleSubmit}>
          <Card
            key={questions[index].id}
            p={[2, null, 3]}
            boxShadow="m"
            bg="white"
            width="100%"
            borderRadius={8}
            overflow="hidden"
          >
            <Stack gap={[2, null, 3]}>
              <Heading as="h3" fontSize={[3, null, 4]}>
                {questions[index].question}
              </Heading>
              <Stack gap={[1, null, 2]}>
                <Text fontSize={[1, null, 2]}>
                  Category: {questions[index].category}
                </Text>
                <Stack direction="row" flexWrap="wrap" gap={[1, null, 2]}>
                  {questions[index]?.tags?.map((a: any, i: number) => (
                    <Tag singleLine key={i}>
                      {a?.name}
                    </Tag>
                  ))}
                </Stack>
                {questions[index].multiple_correct_answers && (
                  <Tag singleLine>Multiple Correct Answers</Tag>
                )}
              </Stack>
              {questions[index].multiple_correct_answers === true ? (
                <CheckboxGroup
                  gap={[2, 3, 4]}
                  options={questions[index].answers
                    .filter((q) => q)
                    .map((filtered) => {
                      return { value: filtered, label: filtered };
                    })}
                  name="test"
                  ml={[2, null, 4]}
                  value={quizState.playerAnswer}
                  onChange={(e) =>
                    dispatch({
                      type: "setAnswer",
                      payload: e.currentTarget.parentElement.children[0].value,
                    })
                  }
                />
              ) : (
                <RadioButtonGroup
                  gap={[2, 3, 4]}
                  options={questions[index].answers
                    .filter((q) => q)
                    .map((filtered) => {
                      return { value: filtered, label: filtered };
                    })}
                  name="test"
                  ml={[2, null, 4]}
                  value={quizState.playerAnswer}
                  onChange={(e) =>
                    dispatch({
                      type: "setAnswer",
                      payload: e.currentTarget.parentElement.children[0].value,
                    })
                  }
                />
              )}
              <Button disabled={quizState.buttonDisabled} type="submit">
                Submit Answer
              </Button>
            </Stack>
          </Card>
        </form>
      )}
    </Contain>
  );
};

export default Home;
