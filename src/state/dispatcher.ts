/* eslint-disable react-hooks/rules-of-hooks */
import { useRecoilCallback } from "recoil";
import { scoreState } from "./atoms";
import { ScoreItem } from "src/types";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const createDispatcher = () => {
  const incrementScore = useRecoilCallback(({ set }) => (correct: boolean) => {
    console.log("herna");
    set(scoreState, (prev: ScoreItem) => {
      // If answer is correct then we add one to score else it stays the same
      const score = correct ? prev.score + 1 : prev.score;
      const outOf = prev.outOf + 1;
      return { score, outOf };
    });
  });

  const resetScore = useRecoilCallback(({ reset }) => () => {
    reset(scoreState);
  });

  return { incrementScore, resetScore };
};

export type Dispatcher = ReturnType<typeof createDispatcher>;
