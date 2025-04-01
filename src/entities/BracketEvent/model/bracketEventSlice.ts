import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/lib/store";
import type { ViewableBracketEvent } from "../types/ViewableBracketEvent";
import { defaultState } from "./default-state";
import * as reducers from "./reducers";

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
    resetState: reducers.resetState,
    setBracketEvent: reducers.setBracketEvent,
    setBracketEventName: reducers.setBracketEventField("name"),
    setLookingToAssignTeam: reducers.setBracketEventField(
      "lookingToAssignTeam"
    ),
    setNumSheets: reducers.setBracketEventField("numSheets"),

    setNumTeams: reducers.setBracketEventField("num_start_teams"),
    setNumWinners: reducers.setBracketEventField("num_end_teams"),
    updateBracketGameTeam: reducers.updateBracketGameTeam,
    updateBracketEvent: reducers.updateBracketEvent,
    updateNumWinners: reducers.updateNumWinners,
    updateNumTeams: reducers.updateNumTeams,
    setBracketEventTournamentId: reducers.setBracketEventField("tournament_id"),
    setBracketEventId: reducers.setBracketEventField("id"),
    setBracketEventOrder: reducers.setBracketEventField("order"),
    setBracketEventType: reducers.setBracketEventField("type"),
  },
});

const getBracketEventState = (state: RootState) => state.bracketEvent;

export const getBracketEventId = (state: RootState) =>
  state?.bracketEvent?.bracket?.id || null;
export const getBracketEventName = (state: RootState) =>
  state?.bracketEvent?.bracket?.name || "";
export const getBracketEventNumTeams = (state: RootState) =>
  state?.bracketEvent?.bracket?.num_start_teams || 16;
export const getBracketEventNumSheets = (state: RootState) =>
  state?.bracketEvent?.bracket?.numSheets || 8;

export const getBracketEventNumWinners = createSelector(
  getBracketEventState,
  (state) => state?.bracket?.num_end_teams || 0
);

export const getBracketEventOrder = (state: RootState) => {
  return state?.bracketEvent?.bracket?.order || 0;
};

export const getBracketEvent = (state: RootState) =>
  state?.bracketEvent?.bracket;

export const getLookingToAssignTeam = (state: RootState) => {
  return state?.bracketEvent?.bracket?.lookingToAssignTeam || null;
};
export const getNumSheets = (state: RootState) => {
  return state?.bracketEvent?.bracket?.numSheets || 8;
};

export const getBracketEventTournamentId = (state: RootState) => {
  return state?.bracketEvent?.bracket?.tournament_id || null;
};

export const {
  assignTeamToGame,
  resetState,
  setBracketEvent,
  setBracketEventName,
  setBracketEventTournamentId,
  setBracketEventId,
  setBracketEventOrder,
  setBracketEventType,
  setLookingToAssignTeam,
  setNumSheets,
  setNumTeams,
  setNumWinners,
  updateBracketGameTeam,
  updateBracketEvent,
  updateNumTeams,
  updateNumWinners,
} = bracketEventSlice.actions;

export default bracketEventSlice.reducer;
