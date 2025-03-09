import { createContext } from "react";
import type { BracketConnections, BracketGame } from "@/entities/Bracket/lib";
export const BracketContext = createContext<{
  brackets: BracketGame[][][];
  selectedGame: BracketGame | null;
  schedule: { [gameId: string]: number };
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
}>({
  brackets: [],
  selectedGame: null,
  schedule: {},
  connections: {},
  deselectGame: () => {},
  selectGame: () => {},
  scrollToBracket: () => {},
  scrollToGame: () => {},
});
