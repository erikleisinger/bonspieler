import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type {
  BracketGameType,
  BracketReadableIdIndex,
  BracketSchedule,
} from "@/entities/Bracket";
import type { Nullable } from "@/shared/types";
import type { RootState } from "@/lib/store";
import * as thunks from "./thunks";

interface BracketGamesState {
  gameIndex: {
    [gameId: string]: BracketGameType;
  };
  brackets: BracketGameType[][][];
  readableIdIndex: BracketReadableIdIndex;
  schedule: BracketSchedule;
  removedGameIds: string[];
  stageId: Nullable<string>;
}

function defaultState() {
  return {
    gameIndex: {},
    brackets: [],
    readableIdIndex: {},
    schedule: {},
    removedGameIds: [],
    stageId: null,
  };
}

const initialState: BracketGamesState = defaultState();

export const bracketGamesSlice = createSlice({
  name: "bracketGames",
  initialState,
  reducers: {
    removeBracket(state, action: PayloadAction<number>) {
      const newBrackets = [...state.brackets];
      newBrackets.splice(action.payload, 1);
      state.brackets = newBrackets;
    },
    resetState(state) {
      state.brackets = defaultState().brackets;
      state.gameIndex = defaultState().gameIndex;
      state.readableIdIndex = defaultState().readableIdIndex;
      state.schedule = defaultState().schedule;
    },
    setBracketGames: (state, action: PayloadAction<BracketGameType[][][]>) => {
      if (
        !!state.brackets?.length &&
        state.brackets.length < action.payload?.length
      ) {
        console.warn(
          "Cannot add bracket games when it already exists. use updateBracketGames instead, or first call resetState"
        );
        return;
      }
      state.brackets = action.payload;
    },
    updateBracketGames: (
      state,
      action: PayloadAction<BracketGameType[][][]>
    ) => {
      state.brackets = [...state.brackets, ...action.payload];
    },
    setBracketGamesReadableIdIndex: (
      state,
      action: PayloadAction<BracketReadableIdIndex>
    ) => {
      if (
        !!Object.keys(state.readableIdIndex).length &&
        Object.keys(state.readableIdIndex).length <
          Object.keys(action.payload)?.length
      ) {
        console.warn(
          "Cannot add bracket games readable id index when it already exists. use updateBracketGamesReadableIdIndex instead, or first call resetState"
        );
        return;
      }
      state.readableIdIndex = action.payload;
    },
    updateBracketGamesReadableIdIndex: (
      state,
      action: PayloadAction<BracketReadableIdIndex>
    ) => {
      state.readableIdIndex = {
        ...state.readableIdIndex,
        ...action.payload,
      };
    },
    setBracketGamesSchedule: (
      state,
      action: PayloadAction<BracketSchedule>
    ) => {
      state.schedule = action.payload;
    },
    setBracketGameIndex: (
      state,
      action: PayloadAction<{
        [gameId: string]: BracketGameType;
      }>
    ) => {
      if (
        !!Object.keys(state.gameIndex).length &&
        Object.keys(state.gameIndex).length <
          Object.keys(action.payload)?.length
      ) {
        console.warn(
          "Cannot add bracket games index when it already exists. use updateBracketGameIndex instead, or first call resetState"
        );
        return;
      }
      state.gameIndex = action.payload;
    },
    updateBracketGameIndex: (
      state,
      action: PayloadAction<{
        [gameId: string]: BracketGameType;
      }>
    ) => {
      state.gameIndex = {
        ...state.gameIndex,
        ...action.payload,
      };
    },
    resetRemovedGameIds: (state) => {
      state.removedGameIds = [];
    },
    updateRemovedGameIds: (state, action: PayloadAction<string[]>) => {
      state.removedGameIds = [
        ...state.removedGameIds,
        ...action.payload.filter((id) => !state.removedGameIds.includes(id)),
      ];
    },
  },
});

export const getBracketEventGamesStageId = (state: RootState) =>
  state.bracketGames.stageId;

export const getBracketGameIndex = (state: RootState) =>
  state.bracketGames.gameIndex;

const getBracketGamesState = (state: RootState) => state.bracketGames;

export const getBracketGames = createSelector(
  [getBracketGamesState],
  (bracketGamesState) => {
    return bracketGamesState.brackets;
  }
);

export const getBracketGamesReadableIdIndex = (state: RootState) => {
  return state.bracketGames.readableIdIndex;
};

export const getRemovedGameIds = (state: RootState) => {
  return state.bracketGames.removedGameIds;
};

export const getGameById = createSelector(
  [getBracketGameIndex, (state, gameId?: Nullable<string>) => gameId],
  (gameIndex, gameId) => {
    if (!gameId) return null;
    console.log("get game by id: ", gameId, gameIndex[gameId]);
    return gameIndex[gameId] || null;
  }
);

export const getReadableGameId = createSelector(
  [
    getBracketGamesReadableIdIndex,
    (state, gameId?: Nullable<string>) => gameId,
  ],
  (readableIdIndex, gameId) => {
    if (!gameId) return null;
    return readableIdIndex[gameId] || null;
  }
);

export const getGamesForBracket = createSelector(
  [getBracketGames, (state, bracketIndex: number) => bracketIndex],
  (brackets, bracketIndex) => {
    return (brackets[bracketIndex] || []).flat();
  }
);

export const getBracketGamesSchedule = (state: RootState) => {
  return state.bracketGames.schedule;
};

export const getDrawNumberForGame = createSelector(
  [getBracketGamesSchedule, (state, gameId: string) => gameId],
  (schedule, gameId) => {
    return schedule[gameId] || null;
  }
);

export const getBracketByIndex = createSelector(
  [getBracketGames, (state, bracketIndex: number) => bracketIndex],
  (brackets, bracketIndex) => {
    return brackets[bracketIndex];
  }
);

export const {
  removeBracket,
  resetRemovedGameIds,
  setBracketGames,
  setBracketGameIndex,
  setBracketGamesReadableIdIndex,
  setBracketGamesSchedule,
  updateBracketGameIndex,
  updateBracketGamesReadableIdIndex,
  updateBracketGames,
  updateRemovedGameIds,
  resetState,
} = bracketGamesSlice.actions;

export const initBracketGames = thunks.initBracketGames;
export const addBracketGames = thunks.addBracketGames;
export const removeBracketGames = thunks.removeBracketGames;
export const shiftBracketAssignmentForGames =
  thunks.shiftBracketAssignmentForGames;

export default bracketGamesSlice.reducer;
