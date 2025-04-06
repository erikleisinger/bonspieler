import {
  BracketDisplaySize,
  BracketEvent,
} from "@/modules/bracket-manager/shared/types";
import { createContext } from "react";

export const BracketContext = createContext<{
  rows: {
    [gameId: string]: {
      rowStart: number;
      rowEnd: number;
    };
  };
  brackets: BracketEvent;
  size: BracketDisplaySize;
}>({
  rows: {},
  brackets: [],
  size: "full",
});
