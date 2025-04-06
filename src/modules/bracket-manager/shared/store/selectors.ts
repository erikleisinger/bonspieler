import type { RootState } from "@/lib/store";
import { createSelector } from "@reduxjs/toolkit";

export const getBracketManagerState = (state: RootState) => {
  if (!state?.bracketManager) return {};
  return state.bracketManager;
};

export const getAllConnections = createSelector(
  [getBracketManagerState],
  (bracketManagerState) => {
    if (!bracketManagerState?.stages) {
      return {};
    }
    return Object.values(bracketManagerState.stages).reduce((acc, stage) => {
      const { winnerConnections } = stage.connections;
      if (!winnerConnections) return acc;
      const winnerConnectionsToNextStages = Object.entries(
        winnerConnections
      ).reduce((all, [key, value]) => {
        if (!value?.stageId) return all;
        return [
          ...all,
          {
            ...value,
            originGameId: key,
          },
        ];
      }, []);
      return [...acc, ...winnerConnectionsToNextStages];
    }, []);
  }
);

export const isConnectionMode = createSelector(
  [getBracketManagerState],
  (bracketManagerState) => {
    if (!bracketManagerState?.connectionMode) {
      return false;
    }
    return bracketManagerState.connectionMode;
  }
);

export const doesBracketStageExist = createSelector(
  [getBracketManagerState, (state, stageId: string) => stageId],
  (bracketManagerState, stageId) => {
    if (!bracketManagerState?.stages) {
      return [];
    }
    return !!bracketManagerState.stages[stageId];
  }
);

export const isBracketStageInitialized = createSelector(
  [getBracketManagerState, (state, stageId: string) => stageId],
  (bracketManagerState, stageId) => {
    if (!bracketManagerState?.stages) {
      return [];
    }
    return !!bracketManagerState.stages[stageId]?.id;
  }
);

export const getBrackets = createSelector(
  [getBracketManagerState, (state, stageId: string) => stageId],
  (bracketManagerState, stageId) => {
    if (!bracketManagerState?.stages) {
      return [];
    }
    return bracketManagerState.stages[stageId]?.brackets || [];
  }
);

export const getConnections = createSelector(
  [getBracketManagerState, (state, stageId: string) => stageId],
  (bracketManagerState, stageId) => {
    if (!bracketManagerState?.stages) {
      return {
        winnerConnections: {},
        loserConnections: {},
        originConnections: {},
      };
    }
    return (
      bracketManagerState.stages[stageId]?.connections || {
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
    if (!bracketManagerState?.stages) {
      return null;
    }
    return bracketManagerState.stages[stageId]?.selectedGame || null;
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
    if (!bracketManagerState?.stages) {
      return {};
    }
    return (
      bracketManagerState.stages[stageId]?.connections?.originConnections || {}
    );
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
    if (!bracketManagerState?.stages) {
      return {};
    }
    return (
      bracketManagerState.stages[stageId]?.connections?.winnerConnections || {}
    );
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
    if (!bracketManagerState?.stages) {
      return {};
    }
    return (
      bracketManagerState.stages[stageId]?.connections?.loserConnections || {}
    );
  }
);

export const getLoserConnectionForGame = createSelector(
  [
    (state: RootState, stageId: string) => getLoserConnections(state, stageId),
    (state, stageId, gameId: string) => gameId,
  ],
  (loserConnections, gameId) => {
    return loserConnections[gameId] || [];
  }
);

export const getReadableIdIndex = createSelector(
  [getBracketManagerState],
  (bracketManagerState) => {
    if (!bracketManagerState?.stages) {
      return {};
    }
    return bracketManagerState.readableIdIndex || {};
  }
);

export const getReadableId = createSelector(
  [
    (state: RootState) => getReadableIdIndex(state),
    (state, gameId: string) => gameId,
  ],
  (readableIdIndex, gameId) => {
    return readableIdIndex[gameId] || "";
  }
);

export const getLookingForLoserConnection = createSelector(
  [getBracketManagerState, (state, stageId: string) => stageId],
  (bracketManagerState, stageId) => {
    if (!bracketManagerState?.stages) {
      return null;
    }
    return (
      bracketManagerState.stages[stageId]?.lookingForLoserConnection || null
    );
  }
);

export const getAvailableGameIds = createSelector(
  [getBracketManagerState, (state, stageId: string) => stageId],
  (bracketManagerState, stageId) => {
    if (!bracketManagerState?.stages) {
      return null;
    }
    return bracketManagerState.stages[stageId]?.availableGameIds || [];
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

export const getBracketName = createSelector(
  [getBracketManagerState, (state, stageId: string) => stageId],
  (bracketManagerState, stageId) => {
    if (!bracketManagerState?.stages) {
      return null;
    }
    return bracketManagerState.stages[stageId]?.name || null;
  }
);

export const isLookingForNextStageConnection = createSelector(
  [getBracketManagerState, (state, stageId: string) => stageId],
  (bracketManagerState, stageId) => {
    if (!bracketManagerState?.stages) {
      return null;
    }
    return (
      bracketManagerState.stages[stageId]?.lookingForNextStageConnection || null
    );
  }
);

export const isLookingForNextStageConnectionForGame = createSelector(
  [
    (state: RootState, stageId: string) =>
      isLookingForNextStageConnection(state, stageId),
    (state, stageId, gameId: string) => gameId,
  ],
  (lookingForNextStageConnection, gameId) => {
    if (!lookingForNextStageConnection?.id) return false;
    return lookingForNextStageConnection?.id === gameId;
  }
);

export const isLookingForNextStageConnectionAnywhere = createSelector(
  [getBracketManagerState],
  (bracketManagerState) => {
    if (!bracketManagerState?.stages) {
      return false;
    }
    return Object.values(bracketManagerState.stages).find((stage) => {
      return stage?.lookingForNextStageConnection;
    });
  }
);

export const doesGameAcceptPrevStage = createSelector(
  [
    (state: RootState, stageId: string, gameId: string) =>
      getOriginConnectionsForGame(state, stageId, gameId),
    (state: RootState) =>
      isLookingForNextStageConnectionAnywhere(state)
        ?.lookingForNextStageConnection || null,
    (state: RootState, stageId: string) => stageId,
  ],
  (originConnections, originGameMaybe, stageId) => {
    if (!originGameMaybe?.id) return false;
    if (originGameMaybe.stageId === stageId) return false;
    if (!originConnections?.length || originConnections?.length < 2)
      return true;
    return originConnections.some(({ gameId }) => !gameId);
  }
);
