import { createSlice, createSelector } from "@reduxjs/toolkit";
import type {
  WinnerConnections,
  LoserConnections,
  OriginConnections,
} from "../types/Connections";
import type { RootState } from "@/lib/store";
import * as thunks from "./thunks";
import { Nullable } from "@/shared/types";
export interface BracketWinnerConnectionsState {
  loserConnections: LoserConnections;
  winnerConnections: WinnerConnections;
  originConnections: OriginConnections;
}

const initialState: BracketWinnerConnectionsState = {
  loserConnections: {},
  winnerConnections: {},
  originConnections: {},
};

export const bracketConnectionsSlice = createSlice({
  name: "bracketConnections",
  initialState,
  reducers: {
    setLoserConnections: (state, action) => {
      state.loserConnections = action.payload;
    },
    updateLoserConnections: (state, action) => {
      state.loserConnections = {
        ...state.loserConnections,
        ...action.payload,
      };
    },
    setOriginConnections: (state, action) => {
      state.originConnections = action.payload;
    },
    updateOriginConnections: (state, action) => {
      state.originConnections = {
        ...state.originConnections,
        ...action.payload,
      };
    },
    setWinnerConnections: (state, action) => {
      state.winnerConnections = action.payload;
    },
    updateWinnerConnections: (state, action) => {
      state.winnerConnections = {
        ...state.winnerConnections,
        ...action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(thunks.initBracketConnections.fulfilled, (state, action) => {
        const { winnerConnections, loserConnections, originConnections } =
          action.payload;
        state.winnerConnections = winnerConnections;
        state.loserConnections = loserConnections;
        state.originConnections = originConnections;
      })
      .addCase(thunks.saveBracketConnections.fulfilled, (state, action) => {
        console.log("connections saved!");
      });
  },
});

export const {
  setWinnerConnections,
  setLoserConnections,
  setOriginConnections,
  updateLoserConnections,
  updateOriginConnections,
  updateWinnerConnections,
} = bracketConnectionsSlice.actions;
export const getWinnerConnections = (state: RootState) =>
  state.bracketConnections.winnerConnections;

export const getOriginConnections = (state: RootState) => {
  return state.bracketConnections.originConnections;
};

export const getLoserConnections = (state: RootState) => {
  return state.bracketConnections.loserConnections;
};

export const getLoserConnectionsForGame = createSelector(
  [getLoserConnections, (state, gameId?: Nullable<string>) => gameId],
  (connections, gameId) => {
    if (!gameId) return null;
    return connections[gameId] || null;
  }
);

export const getWinnerConnectionsForGame = createSelector(
  [getWinnerConnections, (state, gameId?: Nullable<string>) => gameId],
  (connections, gameId) => {
    if (!gameId) return null;
    return connections[gameId] || null;
  }
);

export const getOriginConnectionsForGame = createSelector(
  [getOriginConnections, (state, gameId?: Nullable<string>) => gameId],
  (connections, gameId) => {
    if (!gameId) return null;
    return connections[gameId] || null;
  }
);

export const initBracketConnections = thunks.initBracketConnections;
export const saveBracketConnections = thunks.saveBracketConnections;

export default bracketConnectionsSlice.reducer;
