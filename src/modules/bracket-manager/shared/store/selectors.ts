import type { RootState } from "@/lib/store";
import { createSelector } from "@reduxjs/toolkit";

export const getBracketManagerState = (state: RootState) => {
  if (!state?.bracketManager) return {};
  return state.bracketManager;
};

export const getBrackets = createSelector(
  [getBracketManagerState, (state, stageId: string) => stageId],
  (bracketManagerState, stageId) => {
    if (!bracketManagerState) {
      return [];
    }
    return bracketManagerState[stageId]?.brackets || [];
  }
);

export const getConnections = createSelector(
  [getBracketManagerState, (state, stageId: string) => stageId],
  (bracketManagerState, stageId) => {
    if (!bracketManagerState) {
      return {
        winnerConnections: {},
        loserConnections: {},
        originConnections: {},
      };
    }
    return (
      bracketManagerState[stageId]?.connections || {
        winnerConnections: {},
        loserConnections: {},
        originConnections: {},
      }
    );
  }
);

export const getSelectedGame = createSelector(
  [getBracketManagerState, (state, stageId: string) => stageId],
  (bracketManagerState, stageId) => {
    if (!bracketManagerState) {
      return null;
    }
    return bracketManagerState[stageId]?.selectedGame || null;
  }
);

export const isGameSelected = createSelector(
  [
    (state: RootState, stageId: string) => getSelectedGame(state, stageId),
    (state, stageId, gameId: string) => gameId,
  ],
  (selectedGame, gameId) => {
    return selectedGame?.id === gameId;
  }
);

export const getOriginConnections = createSelector(
  [getBracketManagerState, (state, stageId: string) => stageId],
  (bracketManagerState, stageId) => {
    if (!bracketManagerState) {
      return {};
    }
    return bracketManagerState[stageId]?.connections?.originConnections || {};
  }
);

export const getOriginConnectionsForGame = createSelector(
  [
    (state: RootState, stageId: string) => getOriginConnections(state, stageId),
    (state, stageId, gameId: string) => gameId,
  ],
  (originConnections, gameId) => {
    return originConnections[gameId] || [];
  }
);

export const getWinnerConnections = createSelector(
  [getBracketManagerState, (state, stageId: string) => stageId],
  (bracketManagerState, stageId) => {
    if (!bracketManagerState) {
      return {};
    }
    return bracketManagerState[stageId]?.connections?.winnerConnections || {};
  }
);

export const getWinnerConnectionForGame = createSelector(
  [
    (state: RootState, stageId: string) => getWinnerConnections(state, stageId),
    (state, stageId, gameId: string) => gameId,
  ],
  (winnerConnections, gameId) => {
    return winnerConnections[gameId] || [];
  }
);

export const getLoserConnections = createSelector(
  [getBracketManagerState, (state, stageId: string) => stageId],
  (bracketManagerState, stageId) => {
    if (!bracketManagerState) {
      return {};
    }
    return bracketManagerState[stageId]?.connections?.loserConnections || {};
  }
);

export const getLoserConnectionForGame = createSelector(
  [
    (state: RootState, stageId: string) => getLoserConnections(state, stageId),
    (state, stageId, gameId: string) => gameId,
  ],
  (loserConnections, gameId) => {
    console.log(
      "get loser connection for game: ",
      gameId,
      loserConnections,
      loserConnections[gameId]
    );
    return loserConnections[gameId] || [];
  }
);

export const getReadableIdIndex = createSelector(
  [getBracketManagerState, (state, stageId: string) => stageId],
  (bracketManagerState, stageId) => {
    if (!bracketManagerState) {
      return {};
    }
    return bracketManagerState[stageId]?.readableIdIndex || {};
  }
);

export const getReadableId = createSelector(
  [
    (state: RootState, stageId: string) => getReadableIdIndex(state, stageId),
    (state, stageId, gameId: string) => gameId,
  ],
  (readableIdIndex, gameId) => {
    return readableIdIndex[gameId] || "";
  }
);

export const getLookingForLoserConnection = createSelector(
  [getBracketManagerState, (state, stageId: string) => stageId],
  (bracketManagerState, stageId) => {
    if (!bracketManagerState) {
      return null;
    }
    return bracketManagerState[stageId]?.lookingForLoserConnection || null;
  }
);

export const getAvailableGameIds = createSelector(
  [getBracketManagerState, (state, stageId: string) => stageId],
  (bracketManagerState, stageId) => {
    if (!bracketManagerState) {
      return null;
    }
    return bracketManagerState[stageId]?.availableGameIds || [];
  }
);

export const isGameAvailable = createSelector(
  [
    (state: RootState, stageId: string) => getAvailableGameIds(state, stageId),
    (state, stageId, gameId: string) => gameId,
  ],
  (availableGameIds, gameId) => {
    return (availableGameIds || []).includes(gameId);
  }
);
