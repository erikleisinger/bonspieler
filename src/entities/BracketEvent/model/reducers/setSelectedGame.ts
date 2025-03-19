import { PayloadAction } from "@reduxjs/toolkit";
import type { BracketEventState } from "../bracketEventSlice";
import type { Nullable } from "@/shared/types";
import type { BracketGameType } from "@/entities/Bracket";

export const setSelectedGame = (
  state: BracketEventState,
  action: PayloadAction<Nullable<string | BracketGameType>>
) => {
  if (!state.bracket) return;
  if (!action.payload) {
    state.bracket.selectedGame = null;
    return;
  } else if (typeof action.payload === "string") {
    const game = state.bracket.brackets
      .flat()
      .flat()
      .find(({ id }) => id === action.payload);
    if (!game) return;
    state.bracket.selectedGame = game;
  } else {
    state.bracket.selectedGame = action.payload;
  }
};
