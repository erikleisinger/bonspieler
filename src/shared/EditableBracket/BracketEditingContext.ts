import { createContext } from "react";
import type { BracketGame } from "@/entities/Bracket";
export const BracketEditingContext = createContext({
  editGame: (game: BracketGame) => {
    console.warn("Editing is not currently available.");
  },
});
