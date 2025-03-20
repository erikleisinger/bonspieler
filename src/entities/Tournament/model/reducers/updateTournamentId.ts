import { PayloadAction, createAction } from "@reduxjs/toolkit";
import type { TournamentStoreState } from "../../types/TournamentStoreState";
export function updateTournamentId(
  state: TournamentStoreState,
  action: PayloadAction<string>
) {
  if (!state?.tournament?.stages) return;

  state.tournament.id = action.payload;
}

export const updateTournamentIdAction = createAction<string>(
  "tournament/updateTournamentId"
);
