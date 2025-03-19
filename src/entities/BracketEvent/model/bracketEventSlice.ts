import { createSlice, createSelector } from "@reduxjs/toolkit";
import type { Nullable } from "@/shared/types";
import { RootState } from "@/lib/store";
import type { BracketEvent } from "@/entities/Bracket";
import type { ViewableBracketEvent } from "../types/ViewableBracketEvent";
import { defaultState } from "./default-state";
import * as reducers from "./reducers";

export interface BracketEventState {
  bracket: Nullable<ViewableBracketEvent>;
}

export interface BracketEventStoreState {
  bracket: BracketEvent;
}

const initialState: BracketEventState = {
  bracket: defaultState(),
};

export const bracketEventSlice = createSlice({
  name: "bracketEvent",
  initialState,
  reducers: {
    addBracketToEvent: reducers.addBracketToEvent,
    assignTeamToGame: reducers.assignTeamToGame,
    removeBracket: reducers.removeBracket,
    resetBracketEvent: reducers.resetBracketEvent,
    setBracketEvent: reducers.setBracketEvent,
    setBracketEventDrawTimes: reducers.setBracketEventDrawTimes,
    setBracketEventName: reducers.setBracketEventField("name"),
    setBracketEventRows: reducers.setBracketEventRows,
    setBracketSchedule: reducers.setBracketEventField("schedule"),
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
    setSelectedGame: reducers.setSelectedGame,
    setSelectedDraw: reducers.setBracketEventField("selectedDraw"),
    updateBracketGameTeam: reducers.updateBracketGameTeam,
  },
});

export const getBracketEventBrackets = (state: RootState) =>
  state?.bracketEvent?.bracket?.brackets || [];
export const getBracketEventConnections = (state: RootState) =>
  state?.bracketEvent?.bracket?.connections || {};
export const getBracketEventDrawTimes = (state: RootState) =>
  state?.bracketEvent?.bracket?.drawTimes || {};
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
export const getBracketEventReadableIdIndex = (state: RootState) =>
  state?.bracketEvent?.bracket?.readableIdIndex || {};
export const getBracketEventSchedule = (state: RootState) =>
  state?.bracketEvent?.bracket?.schedule || {};

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

export const getReadableGameId = createSelector(
  [getBracketEventReadableIdIndex],
  (readableIdIndex) => {
    return (gameId: string | null) => {
      if (!gameId) return null;
      return readableIdIndex[gameId] || "?";
    };
  }
);

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

export const {
  addBracketToEvent,
  assignTeamToGame,
  removeBracket,
  resetBracketEvent,
  setBracketEvent,
  setBracketEventDrawTimes,
  setBracketEventName,
  setBracketEventRows,
  setBracketSchedule,
  setCurrentlyViewingBracket,
  setLookingForLoserConnection,
  setLookingToAssignTeam,
  setNumSheets,
  setNumTeams,
  setNumWinners,
  setSelectedDraw,
  setSelectedGame,
  updateBracketGameTeam,
} = bracketEventSlice.actions;

export default bracketEventSlice.reducer;
