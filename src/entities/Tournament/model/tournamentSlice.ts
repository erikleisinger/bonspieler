import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getTournamentById,
  getTournamentTeams as getTournamentTeamsQuery,
} from "../api";
import type {
  Tournament,
  TournamentTeam,
  TournamentStage,
  TournamentBracketStage,
} from "../types";
import type { Nullable } from "@/shared/types";
import { RootState } from "@/lib/store";
import { saveTournament } from "../api";
import { formatTournamentStage } from "./helpers/formatTournamentStage";

interface TournamentState {
  tournament: Nullable<Tournament>;
  teams: TournamentTeam[];
  status: "idle" | "loading" | "failed";
}

const initialState: TournamentState = {
  tournament: null,
  teams: [],
  status: "idle",
};

export const tournamentSlice = createSlice({
  name: "tournament",
  initialState,
  reducers: {
    updateTournamentStage: (state, action: PayloadAction<TournamentStage>) => {
      if (!state?.tournament?.stages) return;

      const { id } = action.payload;
      const index = (state.tournament?.stages || []).findIndex(
        (stage) => stage.id === id
      );
      if (index < 0) return;
      const formattedStage = formatTournamentStage(action.payload);
      if (!formattedStage) return;
      state.tournament.stages[index] = formattedStage;
    },
    updateTournamentStages: (
      state,
      action: PayloadAction<TournamentStage[]>
    ) => {
      if (state.tournament) {
        state.tournament.stages = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle the action types defined by the `incrementAsync` thunk defined below.
      // This lets the slice reducer update the state with request status and results.
      .addCase(initTournamentById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(initTournamentById.fulfilled, (state, action) => {
        state.status = "idle";
        const { teams, tournament } = action.payload;
        state.teams = teams;
        state.tournament = tournament;
      })
      .addCase(initTournamentById.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const getCurrentTournament = (state: RootState) =>
  state.tournament.tournament;
export const getCurrentTournamentStatus = (state: RootState) =>
  state.tournament.status;

export const getCurrentTournamentName = (state: RootState) =>
  state.tournament?.tournament?.name || null;

export const getTournamentTeams = (state: RootState) => state.tournament.teams;

export const initTournamentById = createAsyncThunk(
  "tournament/initTournamentById",
  async (tournamentId: string) => {
    const [tournament, teams] = await Promise.all([
      getTournamentById(tournamentId),
      getTournamentTeamsQuery(tournamentId),
    ]);
    return { tournament, teams };
  }
);

export const updateAndSaveTournament = createAsyncThunk(
  "tournament/updateAndSave",
  async (stage: TournamentStage, { dispatch, getState }) => {
    // First, update the tournament stage
    await dispatch(updateTournamentStage(stage));

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

export const { updateTournamentStage, updateTournamentStages } =
  tournamentSlice.actions;

export default tournamentSlice.reducer;
