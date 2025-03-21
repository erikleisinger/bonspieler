import { PayloadAction } from "@reduxjs/toolkit";
import type { BracketEventState } from "../bracketEventSlice";

export const updateNumTeams = (
  state: BracketEventState,
  action: PayloadAction<number>
) => {
  if (!state.bracket) return;
  state.bracket.num_start_teams += action.payload;
};
