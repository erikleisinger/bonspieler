import { PayloadAction } from "@reduxjs/toolkit";
import type { BracketEventState } from "../bracketEventSlice";

export const updateNumWinners = (
  state: BracketEventState,
  action: PayloadAction<number>
) => {
  if (!state.bracket) return;
  state.bracket.num_end_teams += action.payload;
};
