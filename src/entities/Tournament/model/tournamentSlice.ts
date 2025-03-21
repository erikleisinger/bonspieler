import { createSlice } from "@reduxjs/toolkit";

import type { TournamentStoreState } from "../types/TournamentStoreState";
import type { RootState } from "@/lib/store";
import * as reducers from "./reducers";
import * as selectors from "./selectors";
import * as thunks from "./thunks";

const initialState: TournamentStoreState = {
  tournament: null,
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
      .addCase(addTournamentStage.pending, (state) => {
        state.stageAddStatus = "loading";
      })
      .addCase(addTournamentStage.fulfilled, (state, action) => {
        state.stageAddStatus = "idle";
        const newStages = [...state.tournament.stages, action.payload];
        state.tournament.stages = newStages;
      })
      .addCase(addTournamentStage.rejected, (state) => {
        state.stageAddStatus = "failed";
      })
      .addCase(deleteTournamentStage.pending, (state, action) => {
        state.removingStage = action.meta.arg;
        state.stageRemoveStatus = "loading";
      })
      .addCase(deleteTournamentStage.fulfilled, (state, action) => {
        state.stageRemoveStatus = "idle";
        state.removingStage = null;
        state.tournament.stages = state.tournament.stages.filter(
          (stage) => stage.id !== action.payload
        );
      })
      .addCase(deleteTournamentStage.rejected, (state) => {
        state.stageRemoveStatus = "failed";
        state.removingStage = null;
      })
      .addCase(fetchTournamentStages.pending, (state) => {
        state.stagesStatus = "loading";
      })
      .addCase(fetchTournamentStages.fulfilled, (state, action) => {
        state.stagesStatus = "idle";
        if (!state.tournament) return;
        state.tournament.stages = action.payload;
      })
      .addCase(fetchTournamentStages.rejected, (state) => {
        state.stagesStatus = "failed";
      })

      .addCase(
        reducers.updateTournamentStageAction,
        reducers.updateTournamentStage
      )
      .addCase(reducers.updateTournamentIdAction, reducers.updateTournamentId)
      .addCase(thunks.updateTournamentStageOrder.fulfilled, (state, action) => {
        if (!state.tournament) return;
        state.tournament.stages = action.payload;
      });
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
export const getTournamentStages = selectors.getTournamentField("stages");

export const getCurrentTournamentId = selectors.getTournamentField("id");

export const getStartTeams = selectors.getStartTeams;
export const getEndTeams = selectors.getEndTeams;
export const getNextStageName = selectors.getNextStageName;
export const getPrevStageName = selectors.getPrevStageName;

export const initTournamentById = thunks.initTournamentById;
export const initNewTournament = thunks.initNewTournament;
export const fetchTournamentStages = thunks.getTournamentStages;
export const addTournamentStage = thunks.addTournamentStage;
export const deleteTournamentStage = thunks.deleteTournamentStage;
export const updateTournamentStageOrder = thunks.updateTournamentStageOrder;
export const updateAndSaveTournament = thunks.updateAndSaveTournament;

export const {
  setCurrentTournamentName,
  setTournamentStartDate,
  setTournamentEndDate,
  updateTournamentStage,
  updateTournamentStages,
  initBlankTournament,
} = tournamentSlice.actions;

export default tournamentSlice.reducer;
