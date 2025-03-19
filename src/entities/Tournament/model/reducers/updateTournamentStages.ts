import type { PayloadAction } from "@reduxjs/toolkit";
import type { TournamentStoreState } from "../../types/TournamentStoreState";
import type { TournamentStage } from "../../types";
export function updateTournamentStages(
  state: TournamentStoreState,
  action: PayloadAction<TournamentStage[]>
) {
  if (state.tournament) {
    state.tournament.stages = action.payload;
  }
}
