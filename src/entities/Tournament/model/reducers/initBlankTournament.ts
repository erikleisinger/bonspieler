import { PayloadAction } from "@reduxjs/toolkit";
import type { TournamentStoreState } from "../../types/TournamentStoreState";
export function initBlankTournament(
  state: TournamentStoreState,
  action: PayloadAction<void>
) {
  state.tournament = {
    id: "",
    name: "New tournament",
    stages: [],
  };
}
