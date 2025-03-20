import { createAsyncThunk } from "@reduxjs/toolkit";
import { deleteTournamentStage as deleteTournamentStageMutation } from "../../api";
export const deleteTournamentStage = createAsyncThunk(
  "tournament/deleteTournamentStage",
  async (stageId: string) => {
    const stageAdded = await deleteTournamentStageMutation(stageId);
    return stageAdded;
  }
);
