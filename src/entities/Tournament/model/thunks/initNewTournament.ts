import { createAsyncThunk } from "@reduxjs/toolkit";
import { createNewTournament } from "../../api";
export const initNewTournament = createAsyncThunk(
  "tournament/initNewTournament",
  async () => {
    const tournament = await createNewTournament();
    return tournament;
  }
);
