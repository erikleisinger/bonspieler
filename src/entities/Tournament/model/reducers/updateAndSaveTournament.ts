import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "@/lib/store";
import type { ViewableTournamentStage } from "../../types";
import { updateTournamentStageAction } from "./updateTournamentStage";
import { saveTournament } from "../../api";
export const updateAndSaveTournament = createAsyncThunk(
  "tournament/updateAndSave",
  async (stage: ViewableTournamentStage, { dispatch, getState }) => {
    // First, update the tournament stage
    await dispatch(updateTournamentStageAction(stage));

    // Get the updated tournament from the state
    const state = getState() as RootState;
    const updatedTournament = state.tournament.tournament; // Adjust this path based on your actual state structure
    if (!updatedTournament) return;
    // Save the tournament
    const result = await saveTournament(updatedTournament);

    // Return the result if needed
    return result;
  }
);
