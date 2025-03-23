import { createSlice } from "@reduxjs/toolkit";
import type { TournamentStoreState } from "../types/TournamentStoreState";
import type { RootState } from "@/lib/store";
import * as reducers from "./reducers";
import * as selectors from "./selectors";
import * as thunks from "./thunks";

const initialState: TournamentStoreState = {
  tournament: null,
  stages: [],
  teams: [],
  status: "idle",
  stagesStatus: "idle",
  stageAddStatus: "idle",
  stageRemoveStatus: "idle",
  removingStage: null,
};

export const tournamentSlice = createSlice({
  name: "tournament",
  initialState,
  reducers: {
    initBlankTournament: reducers.initBlankTournament,
    setCurrentTournamentId: (state, action) => {
      if (!state.tournament) return;
      const { id } = action.payload;
      state.tournament.id = id;
    },
    setCurrentTournamentName: reducers.setCurrentTournamentName,
    setTournamentEndDate: reducers.setTournamentEndDate,
    setTournamentStartDate: reducers.setTournamentStartDate,
    updateTournamentStage: reducers.updateTournamentStage,
    updateTournamentStages: reducers.updateTournamentStages,
  },
  extraReducers: (builder) => {
    builder
      // Handle the action types defined by the `incrementAsync` thunk defined below.
      // This lets the slice reducer update the state with request status and results.

      .addCase(initNewTournament.pending, (state) => {
        state.status = "loading";
      })
      .addCase(initNewTournament.fulfilled, (state, action) => {
        state.status = "idle";
        state.tournament = {
          ...action.payload,
          stages: [],
        };
      })
      .addCase(initNewTournament.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(updateAndSaveTournament.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateAndSaveTournament.fulfilled, (state, action) => {
        state.status = "idle";
        state.tournament.stages = action.payload;
      })
      .addCase(updateAndSaveTournament.rejected, (state) => {
        state.status = "failed";
      })

      .addCase(
        reducers.updateTournamentStageAction,
        reducers.updateTournamentStage
      )
      .addCase(reducers.updateTournamentIdAction, reducers.updateTournamentId);
  },
});

export const getCurrentTournament = (state: RootState) =>
  state.tournament.tournament;
export const getCurrentTournamentStatus = (state: RootState) =>
  state.tournament.status;

export const getCurrentTournamentName = selectors.getTournamentField("name");

export const getTournamentStartDate =
  selectors.getTournamentField("start_date");
export const getTournamentEndDate = selectors.getTournamentField("end_date");

export const getTournamentTeams = (state: RootState) => state.tournament.teams;
export const getTournamentStagesStatus = (state: RootState) =>
  state.tournament.stagesStatus;

export const getTournamentAddStageStatus = (state: RootState) =>
  state.tournament.stageAddStatus;
export const getTournamentRemovingStage = (state: RootState) =>
  state.tournament.removingStage;

export const getCurrentTournamentId = selectors.getTournamentField("id");

export const getCurrentTournamentStages = (state: RootState) => {
  return state.tournament.stages || [];
};

export const getStartTeams = selectors.getStartTeams;
export const getEndTeams = selectors.getEndTeams;
export const getNextStageName = selectors.getNextStageName;
export const getPrevStageName = selectors.getPrevStageName;

export const initNewTournament = thunks.initNewTournament;
export const updateAndSaveTournament = thunks.updateAndSaveTournament;

export const {
  setCurrentTournamentId,
  setCurrentTournamentName,
  setTournamentStartDate,
  setTournamentEndDate,
  updateTournamentStage,
  updateTournamentStages,
  initBlankTournament,
} = tournamentSlice.actions;

export default tournamentSlice.reducer;
