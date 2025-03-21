import { PayloadAction } from "@reduxjs/toolkit";
import type { TournamentStoreState } from "../../types/TournamentStoreState";
export function setTournamentEndDate(
  state: TournamentStoreState,
  action: PayloadAction<string>
) {
  if (!state?.tournament) return;

  state.tournament.end_date = action.payload;
}
