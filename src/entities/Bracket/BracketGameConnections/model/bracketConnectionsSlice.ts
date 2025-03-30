import { createSlice, createSelector, PayloadAction } from "@reduxjs/toolkit";
import type {
  WinnerConnections,
  LoserConnections,
  OriginConnections,
  DestinationConnection,
} from "../types/Connections";
import type { RootState } from "@/lib/store";
import { Nullable } from "@/shared/types";
export interface BracketConnectionsStoreState {
  loserConnections: LoserConnections;
  winnerConnections: WinnerConnections;
  originConnections: OriginConnections;
}

function defaultState() {
  return {
    loserConnections: {},
    winnerConnections: {},
    originConnections: {},
  };
}

const initialState: BracketConnectionsStoreState = defaultState();

export const bracketConnectionsSlice = createSlice({
  name: "bracketConnections",
  initialState,
  reducers: {
    resetConnections(state) {
      state.winnerConnections = defaultState().winnerConnections;
      state.originConnections = defaultState().originConnections;
      state.loserConnections = defaultState().loserConnections;
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
    },
    removeLoserConnectionForGame: (state, action: PayloadAction<string>) => {
      const gameId = action.payload;
      const currentLoserDestination = state.loserConnections[gameId];
      if (!currentLoserDestination) {
        console.warn("could not remove loser connection, as it does not exist");
        return;
      }
      state.loserConnections[gameId] = null;

      const newDestinationOrigins = (
        state.originConnections[currentLoserDestination] || []
      ).map((o) => ({
        ...o,
        gameId: o.gameId === gameId ? null : o.gameId,
      }));
      state.originConnections[currentLoserDestination] = newDestinationOrigins;
    },
    setLoserConnectionForGame: (
      state,
      action: PayloadAction<{
        gameId: string;
        destinationGameId: string;
      }>
    ) => {
      const { gameId, destinationGameId } = action.payload;
      const destinationOrigins = state.originConnections[destinationGameId];
      const newDestinationOrigins = Array.from({ length: 2 }).map(
        (_, i) => destinationOrigins[i] || { isWinner: false, gameId: null }
      );

      const availableIndex = newDestinationOrigins.findIndex((o) => !o?.gameId);
      if (availableIndex < 0) {
        console.warn(
          "cannot assign loser connection: destination game is unavailable."
        );
        return;
      }
      newDestinationOrigins.splice(availableIndex, 1, {
        isWinner: false,
        gameId,
      });

      state.originConnections[destinationGameId] = newDestinationOrigins;

      state.loserConnections[gameId] = destinationGameId;
    },
    setConnections: (state, action) => {
      const { loserConnections, winnerConnections, originConnections } =
        action.payload;
      state.loserConnections = loserConnections || {};
      state.winnerConnections = winnerConnections || {};
      state.originConnections = originConnections || {};
    },
    updateWinnerConnectionForGame: (
      state,
      action: PayloadAction<{
        gameId: string;
        newWinnerConnection: DestinationConnection;
      }>
    ) => {
      const { gameId, newWinnerConnection } = action.payload;

      const { gameId: destinationGameId } = newWinnerConnection;

      if (!destinationGameId) {
        console.warn(
          "cannot assign winner connection: destination game is unavailable."
        );
        return;
      }

      const existingDestinationOrigins =
        state.originConnections[destinationGameId] || [];

      if (existingDestinationOrigins.length >= 2) {
        console.warn(
          "cannot assign winner connection: destination game is unavailable."
        );
        return;
      }
      const newOriginConnections = {
        ...state.originConnections,
      };
      newOriginConnections[destinationGameId] = [
        ...existingDestinationOrigins,
        { ...newWinnerConnection, isWinner: true },
      ];
      state.originConnections = newOriginConnections;

      const newWinnerConnections = { ...state.winnerConnections };
      newWinnerConnections[gameId] = newWinnerConnection;
      state.winnerConnections = newWinnerConnections;
    },
  },
});

export const {
  addConnections,
  removeConnections,
  removeLoserConnectionForGame,
  setConnections,
  setLoserConnectionForGame,
  resetConnections,
  updateWinnerConnectionForGame,
} = bracketConnectionsSlice.actions;

export const getConnectionsState = (state: RootState) => {
  return state.bracketConnections;
};

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
