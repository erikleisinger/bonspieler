import { createContext } from "react";
export const BracketEditingContext = createContext<{
  editing: boolean;
  lookingForWinnerConnection: {
    gameId: string;
    bracketNumber: number;
    roundNumber: number;
  } | null;
  removeWinnerConnection: (gameId: string) => void;
  addWinnerConnection: (
    originGameId: string,
    destinationGameId: string
  ) => void;
  lookForWinnerConnection: (
    gameId: string,
    bracketNumber: number,
    roundNumber: number
  ) => void;
}>({
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
