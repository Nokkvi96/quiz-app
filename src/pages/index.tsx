import { useEffect, useRef, useReducer } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { QuizItem } from "src/types";
import { createDispatcher, Dispatcher } from "@state/dispatcher";
import { dispatcherState } from "@state/atoms";
import { Card, Grid, Stack, Heading } from "@components/system";
import { Button, RadioButton, Label } from "@components/atoms";

type QuizAction =
  | { type: "setQuiz"; payload: QuizItem[] }
  | { type: "setQuestion" | "correct" | "incorrect" | "" };

type Quiz = {
  questions: QuizItem[];
  playerAnswer: boolean[];
  index: number;
  isNext: boolean;
  isCorrect: boolean;
};

// display if is correct add to score appropriately

// next question on click
function quizReducer(state: Quiz, action: QuizAction) {
  switch (action.type) {
    case "setQuiz": {
      return {
        ...state,
        questions: action.payload,
      };
    }
    case "setQuestion": {
      return {
        ...state,
      };
    }
  }
  return state;
}

// Initialize state for question
const initState: Quiz = {
  questions: [],
  playerAnswer: [],
  index: 0,
  isNext: false,
  isCorrect: false,
};

const Home: NextPage = () => {
  // Init router
  const router = useRouter();
  const { query } = router;
  const [quizState, dispatch] = useReducer(quizReducer, initState);
  const { questions, index } = quizState;

  const { data, refetch } = useQuery(
    "quiz",
    async () => {
      const response = await fetch(`https://quizapi.io/api/v1/questions`, {
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
      enabled: false,
    }
  );

  const setDispatcher = useSetRecoilState(dispatcherState);
  const dispatcher = useRecoilValue(dispatcherState);
  const dispatcherRef = useRef<Dispatcher>(createDispatcher());

  // Only runs on mount
  useEffect(() => {
    setDispatcher(dispatcherRef.current);
    refetch();
    router.push("?category=linux", undefined, { shallow: true });
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
            correct_answers: Object.values(d.correct_answers),
            tags: d.tags,
            category: d.category,
            difficulty: d.difficulty,
          };
        }),
      });
  }, [data]);

  /**
   * refetches when router query updates
   */
  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, quizState.isNext]);

  const submitAnswer = () => {
    dispatcher?.incrementScore(quizState.isCorrect);
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
            <Heading as="h3" fontSize={[2, null, 3]}>
              {questions[index].question}
            </Heading>
            {questions[index].answers.map((a: string, i) => (
              <>
                {a !== null && (
                  <>
                    <Label key={i}>{a}</Label>
                    <RadioButton value={i} name="test" />
                  </>
                )}
              </>
            ))}
            <Button onClick={submitAnswer}>test</Button>
          </Stack>
        </Card>
      )}
    </Grid>
  );
};

export default Home;
