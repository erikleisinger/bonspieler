import { createContext } from "react";
import type { Nullable } from "@/types";
export const BracketEditingContext = createContext<{
  availableGames: string[];
  editing: boolean;
  lookingForWinnerConnection: Nullable<{
    gameId: string;
    gameIndex: number;
    bracketNumber: number;
    roundNumber: number;
  }>;
  removeWinnerConnection: (gameId: string) => void;
  addWinnerConnection: (destinationGameId: string) => void;
  lookForWinnerConnection: (
    gameId: string,
    gameIndex: number,
    bracketNumber: number,
    roundNumber: number
  ) => void;
}>({
  availableGames: [],
  editing: false,
  lookingForWinnerConnection: null,
  removeWinnerConnection: (gameId: string) => {
    console.warn("Editing is not currently available.");
  },
  addWinnerConnection: (gameId: string) => {
    console.warn("Editing is not currently available.");
  },
  /**
   *
   * @param gameId
   * Will find available winner connections and highlight them.
   */
  lookForWinnerConnection: (
    gameId: string,
    bracketNumber: number,
    roundNumber: number
  ) => {},
});
