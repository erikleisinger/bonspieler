import { createContext } from "react";
import type {
  BracketConnections,
  BracketDrawTimes,
  BracketGame,
  BracketSchedule,
} from "@/entities/Bracket/lib";
import { Nullable } from "../types";
export const BracketContext = createContext<{
  brackets: BracketGame[][][];
  drawTimes: BracketDrawTimes;
  readableIdIndex: { [gameId: string]: string };
  selectedGame: BracketGame | null;
  schedule: BracketSchedule;
  connections: BracketConnections;
  nextStageName: Nullable<string>;
  currentlyViewingBracket: number;
  setCurrentlyViewingBracket: (bracketIndex: number) => void;
}>({
  brackets: [],
  drawTimes: {},
  readableIdIndex: {},
  selectedGame: null,
  schedule: {},
  connections: {},
  nextStageName: null,
  currentlyViewingBracket: 0,
  setCurrentlyViewingBracket: () => {},
});
