import { createSlice, createSelector } from "@reduxjs/toolkit";
import type {
  WinnerConnections,
  LoserConnections,
  OriginConnections,
} from "../types/Connections";
import type { RootState } from "@/lib/store";
import { Nullable } from "@/shared/types";
export interface BracketWinnerConnectionsState {
  loserConnections: LoserConnections;
  winnerConnections: WinnerConnections;
  originConnections: OriginConnections;
  removedConnections: string[];
}

function defaultState() {
  return {
    loserConnections: {},
    winnerConnections: {},
    originConnections: {},
    removedConnections: [],
  };
}

const initialState: BracketWinnerConnectionsState = defaultState();

export const bracketConnectionsSlice = createSlice({
  name: "bracketConnections",
  initialState,
  reducers: {
    resetState(state) {
      state.loserConnections = defaultState().loserConnections;
      state.winnerConnections = defaultState().winnerConnections;
      state.originConnections = defaultState().originConnections;
      state.removedConnections = defaultState().removedConnections;
    },
    addConnections: (state, action) => {
      const { loserConnections, winnerConnections, originConnections } =
        action.payload;
      state.loserConnections = {
        ...state.loserConnections,
        ...(loserConnections || {}),
      };
      state.winnerConnections = {
        ...state.winnerConnections,
        ...(winnerConnections || {}),
      };
      state.originConnections = {
        ...state.originConnections,
        ...(originConnections || {}),
      };
    },
    removeConnections: (state, action) => {
      const gameIds = action.payload;
      const removed: string[] = [];
      gameIds.forEach((gameId) => {
        removed.push(gameId);
        delete state.loserConnections[gameId];
        delete state.winnerConnections[gameId];
        delete state.originConnections[gameId];
      });

      const newOriginConnections = { ...state.originConnections };
      const newLoserConnections = { ...state.loserConnections };
      const newWinnerConnections = { ...state.winnerConnections };

      Object.keys(newOriginConnections).forEach((gameId) => {
        const newConnections = newOriginConnections[gameId] || [];
        newOriginConnections[gameId] = newConnections.map((c) => ({
          ...c,
          gameId: gameIds.includes(c.gameId) ? null : c.gameId,
        }));
      });

      Object.keys(newLoserConnections).forEach((gameId) => {
        const newLoserConnectionGameId = newLoserConnections[gameId];
        if (gameIds.includes(newLoserConnectionGameId)) {
          newLoserConnections[gameId] = null;
        }
      });

      Object.keys(newWinnerConnections).forEach((gameId) => {
        const newWinnerConnectionGameId = newWinnerConnections[gameId];
        if (gameIds.includes(newWinnerConnectionGameId)) {
          newWinnerConnections[gameId] = null;
        }
      });

      state.originConnections = newOriginConnections;
      state.loserConnections = newLoserConnections;
      state.winnerConnections = newWinnerConnections;

      state.removedConnections = [
        ...state.removedConnections,
        ...removed.filter((id) => !state.removedConnections.includes(id)),
      ];
    },
    setConnections: (state, action) => {
      const { loserConnections, winnerConnections, originConnections } =
        action.payload;
      state.loserConnections = loserConnections || {};
      state.winnerConnections = winnerConnections || {};
      state.originConnections = originConnections || {};
    },
  },
});

export const { addConnections, removeConnections, setConnections, resetState } =
  bracketConnectionsSlice.actions;

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

export default bracketConnectionsSlice.reducer;
