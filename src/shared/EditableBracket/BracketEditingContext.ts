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
  lookingForLoserConnection: Nullable<string>;
  removeWinnerConnection: (gameId: string) => void;
  addWinnerConnection: (destinationGameId: string) => void;
  lookForWinnerConnection: (
    gameId: string,
    gameIndex: number,
    bracketNumber: number,
    roundNumber: number
  ) => void;
  lookForLoserConnection: ({
    gameId,
    bracketNumber,
  }: {
    gameId: string;
    bracketNumber: number;
  }) => void;
  addLoserConnection: (gameId: string) => void;
  removeLoserConnection: (gameId: string) => void;
}>({
  availableGames: [],
  editing: false,
  lookingForWinnerConnection: null,
  lookingForLoserConnection: null,
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
    gameIndex: number,
    bracketNumber: number,
    roundNumber: number
  ) => {},
  lookForLoserConnection: (gameId: string, bracketNumber: number) => {},
  addLoserConnection: (gameId: string) => {},
  removeLoserConnection: (gameId: string) => {},
});
