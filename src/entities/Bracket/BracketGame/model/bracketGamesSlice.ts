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
}

function defaultState() {
  return {
    gameIndex: {},
    brackets: [],
    readableIdIndex: {},
    schedule: {},
    removedGameIds: [],
  };
}

const initialState: BracketGamesState = defaultState();

export const bracketGamesSlice = createSlice({
  name: "bracketGames",
  initialState,
  reducers: {
    addBracket: (state, action: PayloadAction<BracketGameType[][]>) => {
      const newBrackets = [...state.brackets, action.payload];
      state.brackets = newBrackets;
    },
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
    setBracketEventBrackets: (
      state,
      action: PayloadAction<BracketGameType[][][]>
    ) => {
      state.brackets = action.payload;
    },
    setBracketEventReadableIdIndex: (
      state,
      action: PayloadAction<BracketReadableIdIndex>
    ) => {
      state.readableIdIndex = action.payload;
    },
    updateBracketEventReadableIdIndex: (
      state,
      action: PayloadAction<BracketReadableIdIndex>
    ) => {
      state.readableIdIndex = {
        ...state.readableIdIndex,
        ...action.payload,
      };
    },
    setBracketEventSchedule: (
      state,
      action: PayloadAction<BracketSchedule>
    ) => {
      state.schedule = action.payload;
    },
    setBracketEventGameIndex: (
      state,
      action: PayloadAction<{
        [gameId: string]: BracketGameType;
      }>
    ) => {
      state.gameIndex = action.payload;
    },
    updateBracketEventGameIndex: (
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
    updateRemovedGameIds: (state, action: PayloadAction<string[]>) => {
      state.removedGameIds = [...state.removedGameIds, ...action.payload];
    },
  },

  extraReducers: (builder) => {
    builder.addCase(thunks.initBracketGames.fulfilled, (state, action) => {
      const { gameIndex, brackets, readableIdIndex, schedule } = action.payload;
      console.log("new schedule: ", action.payload);
      state.gameIndex = gameIndex;
      state.brackets = brackets;
      state.readableIdIndex = readableIdIndex;
      state.schedule = schedule;
    });
    builder.addCase(thunks.saveBracketGames.fulfilled, (state, action) => {
      console.log("saved bracket games!");
    });
  },
});

export const getBracketEventGameIndex = (state: RootState) =>
  state.bracketGames.gameIndex;
export const getBracketEventBrackets = (state: RootState) =>
  state.bracketGames.brackets;

export const getBracketEventReadableIdIndex = (state: RootState) => {
  return state.bracketGames.readableIdIndex;
};

export const getRemovedGameIds = (state: RootState) => {
  return state.bracketGames.removedGameIds;
};

export const getGameById = createSelector(
  [getBracketEventGameIndex, (state, gameId?: Nullable<string>) => gameId],
  (gameIndex, gameId) => {
    if (!gameId) return null;
    return gameIndex[gameId] || null;
  }
);

export const getReadableGameId = createSelector(
  [
    getBracketEventReadableIdIndex,
    (state, gameId?: Nullable<string>) => gameId,
  ],
  (readableIdIndex, gameId) => {
    if (!gameId) return null;
    return readableIdIndex[gameId] || null;
  }
);

export const getGamesForBracket = createSelector(
  [getBracketEventBrackets, (state, bracketIndex: number) => bracketIndex],
  (brackets, bracketIndex) => {
    return (brackets[bracketIndex] || []).flat();
  }
);

export const getBracketEventSchedule = (state: RootState) => {
  return state.bracketGames.schedule;
};

export const getDrawNumberForGame = createSelector(
  [getBracketEventSchedule, (state, gameId: string) => gameId],
  (schedule, gameId) => {
    return schedule[gameId] || null;
  }
);

export const getBracketByIndex = createSelector(
  [getBracketEventBrackets, (state, bracketIndex: number) => bracketIndex],
  (brackets, bracketIndex) => {
    return brackets[bracketIndex];
  }
);

export const initBracketGames = thunks.initBracketGames;
export const saveBracketGames = thunks.saveBracketGames;

export const {
  addBracket,
  removeBracket,
  setBracketEventBrackets,
  setBracketEventGameIndex,
  setBracketEventReadableIdIndex,
  setBracketEventSchedule,
  updateBracketEventGameIndex,
  updateBracketEventReadableIdIndex,
  updateRemovedGameIds,
  resetState,
} = bracketGamesSlice.actions;

export default bracketGamesSlice.reducer;
