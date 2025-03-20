import { createAsyncThunk } from "@reduxjs/toolkit";
import { updateTournamentStages } from "../../api";
import { getTournamentStages } from "../tournamentSlice";
export const updateTournamentStageOrder = createAsyncThunk(
  "tournament/updateTournamentStageOrder",
  async (_, { getState }) => {
    const state = getState();

    const stages = { ...getTournamentStages(state) };
    const updatedStages = Object.values(stages).map((stage, index) => {
      const { games, draws, ...rest } = stage;
      return {
        ...rest,
        order: index,
      };
    });
    const updated = await updateTournamentStages(updatedStages);
    console.log("updated: ", updated);
    return updated;
  }
);
