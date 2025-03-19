import { createSlice } from "@reduxjs/toolkit";

import type { TournamentStoreState } from "../types/TournamentStoreState";
import { RootState } from "@/lib/store";
import * as reducers from "./reducers";
import * as selectors from "./selectors";
import * as thunks from "./thunks";

const initialState: TournamentStoreState = {
  tournament: null,
  teams: [],
  status: "idle",
};

export const tournamentSlice = createSlice({
  name: "tournament",
  initialState,
  reducers: {
    updateTournamentStage: reducers.updateTournamentStage,
    updateTournamentStages: reducers.updateTournamentStages,
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
      })
      .addCase(
        reducers.updateTournamentStageAction,
        reducers.updateTournamentStage
      );
  },
});

export const getCurrentTournament = (state: RootState) =>
  state.tournament.tournament;
export const getCurrentTournamentStatus = (state: RootState) =>
  state.tournament.status;

export const getCurrentTournamentName = selectors.getTournamentField("name");

export const getTournamentTeams = (state: RootState) => state.tournament.teams;

export const getTournamentStages = selectors.getTournamentField("stages");

export const getStartTeams = selectors.getStartTeams;
export const getEndTeams = selectors.getEndTeams;
export const getNextStageName = selectors.getNextStageName;
export const getPrevStageName = selectors.getPrevStageName;

export const initTournamentById = thunks.initTournamentById;

export const updateAndSaveTournament = thunks.updateAndSaveTournament;

export const { updateTournamentStage, updateTournamentStages } =
  tournamentSlice.actions;

export default tournamentSlice.reducer;
