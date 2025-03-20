import { createAsyncThunk } from "@reduxjs/toolkit";
import { addTournamentStage as addTournamentStageMutation } from "../../api";
import { TournamentStageType } from "../../types";
import { getTournamentStages } from "../tournamentSlice";
export const addTournamentStage = createAsyncThunk(
  "tournament/addTournamentStage",
  async (
    {
      tournamentId,
      stageType,
    }: {
      tournamentId: string;
      stageType: TournamentStageType;
    },
    { getState }
  ) => {
    const state = getState();

    const stages = { ...getTournamentStages(state) };

    const stageAdded = await addTournamentStageMutation(
      tournamentId,
      stageType,
      Object.keys(stages || {}).length
    );
    return stageAdded;
  }
);
