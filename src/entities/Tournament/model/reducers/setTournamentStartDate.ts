import { PayloadAction } from "@reduxjs/toolkit";
import type { TournamentStoreState } from "../../types/TournamentStoreState";
export function setTournamentStartDate(
  state: TournamentStoreState,
  action: PayloadAction<string>
) {
  if (!state?.tournament) return;

  state.tournament.start_date = action.payload;
}
