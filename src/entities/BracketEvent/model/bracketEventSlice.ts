import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import type { Nullable } from "@/shared/types";
import { RootState } from "@/lib/store";
import type {
  BracketEvent,
  BracketReadableIdIndex,
  BracketRows,
  BracketGameType,
  BracketSchedule,
  BracketConnections,
} from "@/entities/Bracket";

import { BracketConnectionTeam } from "@erikleisinger/bracket-generator";

import type { ViewableBracketEvent } from "../types/ViewableBracketEvent";

interface BracketEventState {
  bracket: Nullable<ViewableBracketEvent>;
}

const defaultState = (): BracketEventState["bracket"] => ({
  availableGames: [],
  brackets: [],
  connections: {},
  currentlyViewingBracket: 0,
  drawTimes: {},
  id: null,
  lookingForLoserConnection: null,
  name: "",
  numTeams: 16,
  numWinners: [],
  numSheets: 8,
  readableIdIndex: {},
  selectedDraw: null,
  selectedGame: null,
  schedule: {},
  rows: {},
});

const initialState: BracketEventState = {
  bracket: defaultState(),
};

export const bracketEventSlice = createSlice({
  name: "bracketEvent",
  initialState,
  reducers: {
    addBracketToEvent: (
      state,
      action: PayloadAction<{
        brackets: BracketGameType[][][];
        connections: BracketConnections;
        schedule: BracketSchedule;
        readableIdIndex: BracketReadableIdIndex;
        numTeams: number;
        numWinners: number[];
      }>
    ) => {
      state.bracket = {
        ...state.bracket,
        brackets: [...state.bracket?.brackets, ...action.payload.brackets],
        connections: {
          ...state.bracket?.connections,
          ...action.payload.connections,
        },
        readableIdIndex: {
          ...state.bracket?.readableIdIndex,
          ...action.payload.readableIdIndex,
        },
        schedule: { ...state.bracket?.schedule, ...action.payload.schedule },
        numWinners: [...state.bracket.numWinners, ...action.payload.numWinners],
      };
    },
    resetBracketEvent: (state) => {
      state.bracket = defaultState();
    },
    setAvailableGames: (state, action: PayloadAction<string[]>) => {
      if (!state.bracket) return;
      state.bracket.availableGames = action.payload;
    },
    setBracketEvent: (state, action: PayloadAction<BracketEvent>) => {
      const games = action.payload.brackets.flat().flat();
      state.bracket = {
        ...action.payload,
        availableGames: [],
        currentlyViewingBracket: 0,
        lookingForLoserConnection: null,
        selectedDraw: null,
        selectedGame: null,
        rows: games.reduce(
          (all, cur) => ({
            ...all,
            [cur.id]: { rowStart: 1, rowEnd: 2 },
          }),
          {}
        ),
      };
    },
    setBracketEventDrawTimes: (
      state,
      action: PayloadAction<BracketEvent["drawTimes"]>
    ) => {
      if (!state.bracket) return;
      state.bracket.drawTimes = action.payload;
    },
    setBracketEventName: (state, action: PayloadAction<string>) => {
      if (!state.bracket) return;
      state.bracket.name = action.payload;
    },
    setBracketEventRows: (state, action: PayloadAction<BracketRows>) => {
      if (!state.bracket) return;
      const newRows = {
        ...state.bracket.rows,
        ...action.payload,
      };
      state.bracket.rows = newRows;
    },
    setBracketSchedule: (state, action: PayloadAction<BracketSchedule>) => {
      if (!state.bracket) return;
      state.bracket.schedule = action.payload;
    },
    setCurrentlyViewingBracket: (state, action: PayloadAction<number>) => {
      if (!state.bracket) return;
      state.bracket.currentlyViewingBracket = action.payload;
    },
    setLookingForLoserConnection: (
      state,
      action: PayloadAction<Nullable<string>>
    ) => {
      if (!state.bracket) return;
      state.bracket.lookingForLoserConnection = action.payload;
    },
    setNumSheets: (state, action: PayloadAction<number>) => {
      if (!state.bracket) return;
      state.bracket.numSheets = action.payload;
    },
    setNumTeams: (state, action: PayloadAction<number>) => {
      if (!state.bracket) return;
      state.bracket.numTeams = action.payload;
    },
    setNumWinners: (state, action: PayloadAction<number[]>) => {
      if (!state.bracket) return;
      state.bracket.numWinners = action.payload;
    },
    setSelectedGame: (
      state,
      action: PayloadAction<Nullable<string | BracketGameType>>
    ) => {
      if (!state.bracket) return;
      if (!action.payload) {
        state.bracket.selectedGame = null;
        return;
      } else if (typeof action.payload === "string") {
        const game = state.bracket.brackets
          .flat()
          .flat()
          .find(({ id }) => id === action.payload);
        if (!game) return;
        state.bracket.selectedGame = game;
      } else {
        state.bracket.selectedGame = action.payload;
      }
    },
    setSelectedDraw: (state, action: PayloadAction<Nullable<number>>) => {
      if (!state.bracket) return;
      state.bracket.selectedDraw = action.payload;
    },
    updateBracketGameTeam: (
      state,
      action: PayloadAction<{
        gameId: string;
        teamIndex: number;
        updates: Partial<BracketConnectionTeam>;
      }>
    ) => {
      const { gameId, teamIndex, updates } = action.payload;
      const game = state.bracket.connections[gameId];
      const { teams } = game.teams;
      const newTeams = [...teams];
      const newTeam = { ...newTeams[teamIndex], ...updates };

      newTeams.splice(teamIndex, 1, newTeam);
      state.bracket.connections[gameId].teams = newTeams;
    },
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

export const getAvailableGames = createSelector(
  (state: RootState) => state.bracketEvent?.bracket?.availableGames,
  (availableGames) => availableGames || []
);

export const getLookingForLoserConnection = (state: RootState) => {
  return state?.bracketEvent?.bracket?.lookingForLoserConnection || null;
};
export const getNumSheets = (state: RootState) => {
  return state?.bracketEvent?.bracket?.numSheets || 8;
};
export const isGameAvailable = createSelector(
  [getAvailableGames],
  (availableGames) => {
    return (gameId: string) => {
      return availableGames.includes(gameId);
    };
  }
);

export const {
  addBracketToEvent,
  resetBracketEvent,
  setAvailableGames,
  setBracketEvent,
  setBracketEventDrawTimes,
  setBracketEventName,
  setBracketEventRows,
  setBracketSchedule,
  setCurrentlyViewingBracket,
  setLookingForLoserConnection,
  setNumSheets,
  setNumTeams,
  setNumWinners,
  setSelectedDraw,
  setSelectedGame,
  updateBracketGameTeam,
} = bracketEventSlice.actions;

export default bracketEventSlice.reducer;
