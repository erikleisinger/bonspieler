import { PayloadAction } from "@reduxjs/toolkit";
import type { BracketEvent } from "@/entities/Bracket";
import type { BracketEventState } from "../bracketEventSlice";

// Define the reducer function
export const setBracketEvent = (
  state: BracketEventState,
  action: PayloadAction<BracketEvent>
) => {
  const games = action.payload.brackets.flat().flat();
  state.bracket = {
    ...action.payload,
    currentlyViewingBracket: 0,
    lookingForLoserConnection: null,
    selectedDraw: null,
    selectedGame: null,
    rows: games.reduce(
      (all, cur) => ({
        ...all,
        [cur.id]: { rowStart: 1, rowEnd: 2 },
      }),
      {}
    ),
  };
};
