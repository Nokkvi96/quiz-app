/* eslint-disable react-hooks/rules-of-hooks */
import { useRecoilCallback } from "recoil";
import { scoreState } from "./atoms";
import { ScoreItem } from "src/types";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const createDispatcher = () => {
  const incrementScore = useRecoilCallback(({ set }) => () => {
    set(scoreState, (oldScore: ScoreItem) => {
      return { score: (oldScore.score += 1), outOf: (oldScore.outOf += 1) };
    });
    console.log(scoreState);
  });

  const resetScore = useRecoilCallback(({ reset }) => () => {
    reset(scoreState);
  });

  return { incrementScore, resetScore };
};

export type Dispatcher = ReturnType<typeof createDispatcher>;
