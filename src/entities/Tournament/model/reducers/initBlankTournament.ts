import { PayloadAction } from "@reduxjs/toolkit";
import type { TournamentStoreState } from "../../types/TournamentStoreState";
import { Nullable } from "@/shared/types";
export function initBlankTournament(
  state: TournamentStoreState,
  action: PayloadAction<Nullable<string>>
) {
  const id = action.payload;
  state.tournament = {
    id: id || "",
    name: "New tournament",
    start_date: null,
    end_date: null,
    num_sheets: 8,
  };
}
