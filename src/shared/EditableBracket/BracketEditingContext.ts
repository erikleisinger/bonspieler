import { createContext } from "react";
import type { BracketGame, BracketConnection } from "@/entities/Bracket";
export const BracketEditingContext = createContext({
  editing: false,
  lookingForWinnerConnection: false,
  editGame: (game: BracketGame) => {
    console.warn("Editing is not currently available.");
  },
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
  lookForWinnerConnection: (gameId: string) => {
    console.warn("Editing is not currently available.");
  },
});
