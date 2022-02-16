import { useEffect, useRef } from "react";
import type { NextPage } from "next";
import { useQuery } from "react-query";
import { QuizItem } from "src/types";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { createDispatcher, Dispatcher } from "src/recoil/dispatcher";
import { dispatcherState } from "src/recoil/atoms";
import { Card, Grid, Stack, Heading } from "@components/system";
import { Button, RadioButton } from "@components/atoms";

/**
 *
 * @returns
 */
const fetchQuiz = async () => {
  const response = await fetch("https://quizapi.io/api/v1/questions", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-Api-Key": process.env.API_KEY,
    },
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const Home: NextPage = () => {
  const { data } = useQuery("", fetchQuiz);

  const setDispatcher = useSetRecoilState(dispatcherState);
  const dispatcher = useRecoilValue(dispatcherState);
  const dispatcherRef = useRef<Dispatcher>(createDispatcher());

  useEffect(() => {
    setDispatcher(dispatcherRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const increment = () => {
    dispatcher?.incrementScore();
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
      {data?.map((d: QuizItem) => (
        <Card
          key={d.id}
          boxShadow="m"
          bg="white"
          width="100%"
          borderRadius={8}
          overflow="hidden"
        >
          <Stack gap={[2, null, 6]}>
            <Heading as="h3" fontSize={[2, 3, 4]}>
              {d.question}
            </Heading>
            <RadioButton />
            <Button onClick={increment}>test</Button>
          </Stack>
        </Card>
      ))}
    </Grid>
  );
};

export default Home;
