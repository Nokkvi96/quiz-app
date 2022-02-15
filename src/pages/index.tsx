import type { NextPage } from "next";

import { Grid } from "@components/system";

const Home: NextPage = () => {
  return (
    <Grid
      gridGap={[4, null, 6]}
      gridTemplateColumns={[
        "repeat(1, 1fr)",
        "repeat(2, 1fr)",
        "repeat(3, 1fr)",
      ]}
    ></Grid>
  );
};

export default Home;
