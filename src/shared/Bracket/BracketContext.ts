import { createContext } from "react";
import type {
  BracketConnections,
  BracketDrawTimes,
  BracketGame,
  BracketSchedule,
} from "@/entities/Bracket/lib";
export const BracketContext = createContext<{
  brackets: BracketGame[][][];
  drawTimes: BracketDrawTimes;
  readableIdIndex: { [gameId: string]: string };
  selectedGame: BracketGame | null;
  schedule: BracketSchedule;
  connections: BracketConnections;
  deselectGame: () => void;
  selectGame: (game: BracketGame) => void;
  scrollToBracket: (bracketIndex: number) => void;
  scrollToGame: (
    gameId: string,
    params?: {
      block?: "start" | "center" | "end";
      inline?: "start" | "center" | "end";
    }
  ) => void;
  currentlyViewingBracket: number;
  setCurrentlyViewingBracket: (bracketIndex: number) => void;
}>({
  brackets: [],
  drawTimes: {},
  readableIdIndex: {},
  selectedGame: null,
  schedule: {},
  connections: {},
  deselectGame: () => {},
  selectGame: () => {},
  scrollToBracket: () => {},
  scrollToGame: () => {},
  currentlyViewingBracket: 0,
  setCurrentlyViewingBracket: () => {},
});
