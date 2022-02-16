import { atom } from "recoil";
import { ScoreItem } from "src/types";
import { Dispatcher } from "./dispatcher";

export const scoreState = atom<ScoreItem>({
  key: "scoreState",
  default: { score: 0, outOf: 0 },
});

export const dispatcherState = atom<Dispatcher | undefined>({
  key: "dispatcherState",
  default: undefined,
});
