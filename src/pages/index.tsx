import type { NextPage } from "next";
import { useQuery } from "react-query";

import { Box, Grid, Text } from "@components/system";

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
  const { isLoading, error, data } = useQuery("", fetchQuiz);
  console.log(isLoading, error, data);

  return (
    <Grid
      gridGap={[4, null, 6]}
      gridTemplateColumns={[
        "repeat(1, 1fr)",
        "repeat(2, 1fr)",
        "repeat(3, 1fr)",
      ]}
    >
      {data?.map((d: any) => (
        <Box key={d.id}>
          <Text>{d.question}</Text>
        </Box>
      ))}
    </Grid>
  );
};

export default Home;
