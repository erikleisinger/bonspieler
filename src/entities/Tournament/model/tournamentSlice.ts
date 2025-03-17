import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getTournamentById,
  getTournamentTeams as getTournamentTeamsQuery,
} from "../api";
import type { Tournament, TournamentTeam, TournamentStage } from "../types";
import type { Nullable } from "@/shared/types";
import { RootState } from "@/lib/store";

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

export const { updateTournamentStages } = tournamentSlice.actions;

export default tournamentSlice.reducer;
