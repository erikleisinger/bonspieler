import { createAsyncThunk } from "@reduxjs/toolkit";
import { getTournamentStages as getStagesQuery } from "../../api";
export const getTournamentStages = createAsyncThunk(
  "tournament/getTournamentStages",
  async (tournamentId: string) => {
    const stages = await getStagesQuery(tournamentId);
    return stages;
  }
);
