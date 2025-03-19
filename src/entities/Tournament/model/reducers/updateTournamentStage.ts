import { PayloadAction, createAction } from "@reduxjs/toolkit";
import type { TournamentStoreState } from "../../types/TournamentStoreState";
import type { ViewableTournamentStage } from "../../types";
import { formatTournamentStageForSave } from "../helpers/formatTournamentStage";
export function updateTournamentStage(
  state: TournamentStoreState,
  action: PayloadAction<ViewableTournamentStage>
) {
  if (!state?.tournament?.stages) return;

  const { id } = action.payload;
  const index = (state.tournament?.stages || []).findIndex(
    (stage) => stage.id === id
  );
  console.log("found index: ", index);
  if (index < 0) return;
  const formattedStage = formatTournamentStageForSave(action.payload);
  console.log("formatted stage: ", formattedStage);
  if (!formattedStage) return;
  state.tournament.stages[index] = formattedStage;
}

export const updateTournamentStageAction =
  createAction<ViewableTournamentStage>("tournament/updateStage");
