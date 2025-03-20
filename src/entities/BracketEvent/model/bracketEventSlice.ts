import { createSlice } from "@reduxjs/toolkit";
import type { Nullable } from "@/shared/types";
import type { RootState } from "@/lib/store";
import type { BracketEvent } from "@/entities/Bracket";
import type { ViewableBracketEvent } from "../types/ViewableBracketEvent";
import { defaultState } from "./default-state";
import * as reducers from "./reducers";
import * as thunks from "./thunks";

export interface BracketEventState {
  bracket: ViewableBracketEvent;
}

export interface BracketEventStoreState {
  bracket: ViewableBracketEvent;
}

const initialState: BracketEventStoreState = {
  bracket: defaultState(),
};

export const bracketEventSlice = createSlice({
  name: "bracketEvent",
  initialState,
  reducers: {
    assignTeamToGame: reducers.assignTeamToGame,
    resetBracketEvent: reducers.resetBracketEvent,
    setBracketEvent: reducers.setBracketEvent,
    setBracketEventName: reducers.setBracketEventField("name"),
    setBracketEventRows: reducers.setBracketEventRows,
    setCurrentlyViewingBracket: reducers.setBracketEventField(
      "currentlyViewingBracket"
    ),
    setLookingForLoserConnection: reducers.setBracketEventField(
      "lookingForLoserConnection"
    ),
    setLookingToAssignTeam: reducers.setBracketEventField(
      "lookingToAssignTeam"
    ),
    setNumSheets: reducers.setBracketEventField("numSheets"),
    setNumTeams: reducers.setBracketEventField("numTeams"),
    setNumWinners: reducers.setBracketEventField("numWinners"),
    setSelectedDraw: reducers.setBracketEventField("selectedDraw"),
    updateBracketGameTeam: reducers.updateBracketGameTeam,
    updateBracketEvent: reducers.updateBracketEvent,
  },
  extraReducers: (builder) => {
    builder
      .addCase(thunks.initBracketEvent.fulfilled, (state, action) => {
        return state;
      })
      .addCase(thunks.setSelectedGame.fulfilled, (state, action) => {
        if (!state.bracket) return;
        state.bracket.selectedGame = action.payload;
      })
      .addCase(thunks.removeBracketFromEvent.fulfilled, (state, action) => {
        console.log("removed bracket");
      });
  },
});

export const getBracketEventBrackets = (state: RootState) =>
  state?.bracketEvent?.bracket?.brackets || [];
export const getBracketEventConnections = (state: RootState) =>
  state?.bracketEvent?.bracket?.connections || {};

export const getBracketEventId = (state: RootState) =>
  state?.bracketEvent?.bracket?.id || null;
export const getBracketEventName = (state: RootState) =>
  state?.bracketEvent?.bracket?.name || "";
export const getBracketEventNumTeams = (state: RootState) =>
  state?.bracketEvent?.bracket?.numTeams || 16;
export const getBracketEventNumSheets = (state: RootState) =>
  state?.bracketEvent?.bracket?.numSheets || 8;
export const getBracketEventNumWinners = (state: RootState) =>
  state?.bracketEvent?.bracket?.numWinners || [];
export const getBracketEventOrder = (state: RootState) => {
  return state?.bracketEvent?.bracket?.order || 0;
};

export const getBracketEventSelectedDraw = (state: RootState) =>
  state?.bracketEvent?.bracket?.selectedDraw || null;

const EMPTY_ROWS = {};

export const getBracketEventRows = (state: RootState) =>
  state?.bracketEvent?.bracket?.rows || EMPTY_ROWS;

export const getSelectedGame = (state: RootState) =>
  state?.bracketEvent?.bracket?.selectedGame || null;

export const getSelectedDraw = (state: RootState) => {
  return state?.bracketEvent?.bracket?.selectedDraw || null;
};

export const getBracketEvent = (state: RootState) =>
  state?.bracketEvent?.bracket;

export const getCurrentlyViewingBracket = (state: RootState) => {
  return state?.bracketEvent?.bracket?.currentlyViewingBracket || 0;
};

export const getLookingForLoserConnection = (state: RootState) => {
  return state?.bracketEvent?.bracket?.lookingForLoserConnection || null;
};

export const getLookingToAssignTeam = (state: RootState) => {
  return state?.bracketEvent?.bracket?.lookingToAssignTeam || null;
};
export const getNumSheets = (state: RootState) => {
  return state?.bracketEvent?.bracket?.numSheets || 8;
};

export const initBracketEvent = thunks.initBracketEvent;
export const setSelectedGame = thunks.setSelectedGame;
export const addBracketToEvent = thunks.addBracketToEvent;
export const removeBracketFromEvent = thunks.removeBracketFromEvent;
export const saveBracketEvent = thunks.saveBracketEvent;
export const {
  assignTeamToGame,
  resetBracketEvent,
  setBracketEvent,
  setBracketEventName,
  setBracketEventRows,
  setCurrentlyViewingBracket,
  setLookingForLoserConnection,
  setLookingToAssignTeam,
  setNumSheets,
  setNumTeams,
  setNumWinners,
  setSelectedDraw,
  updateBracketGameTeam,
  updateBracketEvent,
} = bracketEventSlice.actions;

export default bracketEventSlice.reducer;
