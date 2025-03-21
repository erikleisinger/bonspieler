import { PayloadAction } from "@reduxjs/toolkit";
import type { TournamentStoreState } from "../../types/TournamentStoreState";
export function setCurrentTournamentName(
  state: TournamentStoreState,
  action: PayloadAction<string>
) {
  if (!state?.tournament) return;

  state.tournament.name = action.payload;
}
