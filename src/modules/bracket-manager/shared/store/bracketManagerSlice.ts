import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type {
  BracketEvent,
  BracketGame,
  DestinationConnection,
  LoserConnections,
  OriginConnection,
  OriginConnections,
  ReadableIdIndex,
  WinnerConnections,
} from "../types";
import type { Nullable } from "@/shared/types";
import { generateReadableIdIndex } from "./utils";

interface BracketManagerState {
  id: Nullable<string>;
  name: string;
  order: number;
  type: string;
  tournamentId: string;
  availableGameIds: string[];
  brackets: BracketEvent;
  connections: {
    winnerConnections: WinnerConnections;
    loserConnections: LoserConnections;
    originConnections: OriginConnections;
  };

  lookingForLoserConnection: Nullable<BracketGame>;
  lookingForNextStageConnection: Nullable<BracketGame>;
  selectedGame: Nullable<BracketGame>;
}

export interface BracketManagerStoreState {
  connectionMode: boolean;
  stages: {
    [stageId: string]: BracketManagerState;
  };
  gameIndex: {
    [gameId: string]: BracketGame;
  };
  readableIdIndex: ReadableIdIndex;
  stageNameIndex: {
    [stageId: string]: string;
  };
}

const initialState: BracketManagerStoreState = {
  stages: {},
  gameIndex: {},
  readableIdIndex: {},
  stageNameIndex: {},
  connectionMode: false,
};

export const bracketManagerSlice = createSlice({
  name: "bracketManager",
  initialState,
  reducers: {
    addOriginConnectionForGame: (
      state,
      action: PayloadAction<{
        stageId: string;
        gameId: string;
        newOriginConnection: OriginConnection;
      }>
    ) => {
      const { stageId, gameId, newOriginConnection } = action.payload;

      if (!gameId) {
        console.warn("cannot assign origin connection:  game is unavailable.");
        return;
      }

      const existingOrigins =
        state.stages[stageId].connections.originConnections[gameId] || [];
      console.log("existingOrigins", existingOrigins);
      if (
        existingOrigins.length >= 2 &&
        existingOrigins.every(({ gameId }) => !!gameId)
      ) {
        console.warn(
          "cannot assign origin connection: game has too many origins already."
        );
        return;
      }
      const newOriginConnections = {
        ...state.stages[stageId].connections.originConnections,
      };

      newOriginConnections[gameId] = [...existingOrigins, newOriginConnection];
      state.stages[stageId].connections.originConnections =
        newOriginConnections;
    },
    beginLookingForLoserConnection: (
      state,
      action: { payload: { stageId: string; gameId: string } }
    ) => {
      const { stageId, gameId } = action.payload;
      if (!(state?.stages || {})[stageId]) {
        return;
      }
      const game = state.stages[stageId].brackets
        .flat()
        .flat()
        .find(({ id }) => id === gameId);
      if (!game) {
        console.warn(
          "could not look for loser connection: origin game not found"
        );
        return;
      }

      state.stages[stageId].lookingForLoserConnection = game;

      state.stages[stageId].availableGameIds = state.stages[stageId].brackets
        .flat()
        .flat()
        .filter(({ id, bracketNumber }) => {
          if (bracketNumber <= game.bracketNumber) return false;
          const originConnections =
            state.stages[stageId].connections.originConnections[id] || [];
          if (originConnections.length < 2) return true;
          return originConnections.some(({ gameId }) => !gameId);
        })
        .map(({ id }) => id);
    },
    beginLookingForNextStageConnection: (
      state,
      action: { payload: { stageId: string; gameId: string } }
    ) => {
      const { stageId, gameId } = action.payload;
      if (!(state?.stages || {})[stageId]) {
        return;
      }
      const game = state.stages[stageId].brackets
        .flat()
        .flat()
        .find(({ id }) => id === gameId);
      if (!game) {
        console.warn(
          "could not look for next stage connection: origin game not found"
        );
        return;
      }
      state.stages[stageId].lookingForNextStageConnection = game;
    },
    cancelLookingForLoserConnection: (
      state,
      action: { payload: { stageId: string } }
    ) => {
      const { stageId } = action.payload;
      if (!(state?.stages || {})[stageId]) {
        return;
      }
      state.stages[stageId].lookingForLoserConnection = null;
      state.stages[stageId].availableGameIds = [];
    },
    cancelLookingForNextStageConnection: (
      state,
      action: { payload: { stageId: string } }
    ) => {
      const { stageId } = action.payload;
      if (!(state?.stages || {})[stageId]) {
        return;
      }
      state.stages[stageId].lookingForNextStageConnection = null;
    },
    initBracketEvent: (state, action: { payload: { stageId: string } }) => {
      const { stageId } = action.payload;
      /**
       * If stage is already initialized, do not overwrite it
       */
      if (!!state.stages[stageId]) return;
      state.stages[stageId] = {
        id: null,
        name: "",
        order: 0,
        type: "",
        brackets: [],
        connections: {
          winnerConnections: {},
          loserConnections: {},
          originConnections: {},
        },
        lookingForLoserConnection: null,
        lookingForNextStageConnection: null,
        selectedGame: null,
        availableGameIds: [],
      };
    },
    removeLoserConnectionForGame: (
      state,
      action: { payload: { stageId: string; gameId: string } }
    ) => {
      const { stageId, gameId } = action.payload;
      if (!(state?.stages || {})[stageId]) {
        console.warn("bracketManager state not initialized");
        return;
      }

      const currentLoserDestination =
        state.stages[stageId].connections.loserConnections[gameId]?.gameId;
      if (!currentLoserDestination) {
        console.warn("could not remove loser connection, as it does not exist");
        return;
      }
      state.stages[stageId].connections.loserConnections[gameId] = null;

      const newDestinationOrigins = (
        state.stages[stageId].connections.originConnections[
          currentLoserDestination
        ] || []
      ).map((o) => ({
        ...o,
        gameId: o.gameId === gameId ? null : o.gameId,
      }));
      state.stages[stageId].connections.originConnections[
        currentLoserDestination
      ] = newDestinationOrigins;
    },
    removeWinnerConnectionForGame: (
      state,
      action: { payload: { stageId: string; gameId: string } }
    ) => {
      const { stageId, gameId } = action.payload;
      if (!(state?.stages || {})[stageId]) {
        console.warn("bracketManager state not initialized");
        return;
      }

      const currentWinnerDestination =
        state.stages[stageId].connections.winnerConnections[gameId];

      if (!currentWinnerDestination) {
        console.warn(
          "could not remove winner connection, as it does not exist"
        );
        return;
      }

      const { gameId: destinationGameId, stageId: destinationStageId } =
        currentWinnerDestination;
      state.stages[stageId].connections.winnerConnections[gameId] = null;

      const newDestinationOrigins = (
        state.stages[destinationStageId || stageId].connections
          .originConnections[destinationGameId] || []
      ).filter((o) => {
        return !(o.gameId === gameId && o.stageId === stageId);
      });
      state.stages[destinationStageId || stageId].connections.originConnections[
        destinationGameId
      ] = newDestinationOrigins;
    },
    setBrackets: (
      state,
      action: { payload: { stageId: string; brackets: BracketEvent } }
    ) => {
      const { stageId, brackets } = action.payload;
      if (!(state?.stages || {})[stageId]) {
        console.warn("bracketManager state not initialized");
        return;
      }

      state.stages[stageId].brackets = brackets;
      const newReadableIdIndex = {
        ...state.readableIdIndex,
        ...generateReadableIdIndex(brackets),
      };
      state.readableIdIndex = newReadableIdIndex;
    },
    setConnections: (
      state,
      action: {
        payload: {
          stageId: string;
          winnerConnections: WinnerConnections;
          loserConnections: LoserConnections;
          originConnections: OriginConnections;
        };
      }
    ) => {
      const {
        stageId,
        winnerConnections,
        loserConnections,
        originConnections,
      } = action.payload;
      if (!(state?.stages || {})[stageId]) {
        console.warn("bracketManager state not initialized");
        return;
      }
      state.stages[stageId].connections = {
        winnerConnections,
        loserConnections,
        originConnections,
      };
    },
    setBracketStageInfo: (
      state,
      action: {
        payload: {
          stageId: string;
          name: string;
          type: string;
          tournamentId: string;
        };
      }
    ) => {
      const { stageId, name, type } = action.payload;
      if (!(state?.stages || {})[stageId]) {
        console.warn("bracketManager state not initialized");
        return;
      }
      state.stages[stageId].id = stageId;
      state.stages[stageId].name = name;
      state.stages[stageId].type = type;
      state.stages[stageId].tournamentId = action.payload.tournamentId;
      const newStageNameIndex = {
        ...state.stageNameIndex,
        [stageId]: name,
      };
      state.stageNameIndex = newStageNameIndex;
    },

    setSelectedGame: (
      state,
      action: {
        payload: {
          stageId: string;
          game: Nullable<BracketGame | string>;
        };
      }
    ) => {
      const { game: selectedGameOrGameId, stageId } = action.payload;
      if (!state || !state.stages[stageId]) {
        console.warn("bracketManager state not initialized");
        return;
      }
      if (typeof selectedGameOrGameId === "string") {
        const game = state.stages[stageId].brackets
          .flat()
          .flat()
          .find((game) => game.id === selectedGameOrGameId);
        if (!game) {
          console.warn("could not set selected game: game not found");
          return;
        }
        state.stages[stageId].selectedGame = game;
      } else {
        state.stages[stageId].selectedGame = selectedGameOrGameId;
      }
    },
    setLoserConnectionForGame: (
      state,
      action: {
        payload: {
          stageId: string;
          originGameId: string;
          destinationGameId: string;
        };
      }
    ) => {
      const { stageId, originGameId, destinationGameId } = action.payload;
      if (!(state?.stages || {})[stageId]) {
        console.warn("bracketManager state not initialized");
        return;
      }
      const destinationOrigins =
        state.stages[stageId].connections.originConnections[
          destinationGameId
        ] || [];
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
        gameId: originGameId,
        stageId,
      });

      state.stages[stageId].connections.originConnections[destinationGameId] =
        newDestinationOrigins;

      state.stages[stageId].connections.loserConnections[originGameId] = {
        gameId: destinationGameId,
        stageId,
      };
      state.stages[stageId].lookingForLoserConnection = null;
      state.stages[stageId].availableGameIds = [];
    },
    setWinnerConnectionForGame: (
      state,
      action: PayloadAction<{
        originStageId: string;
        originGameId: string;
        newWinnerConnection: DestinationConnection;
      }>
    ) => {
      const { originGameId, newWinnerConnection, originStageId } =
        action.payload;

      const { gameId: destinationGameId, stageId: destinationStageId } =
        newWinnerConnection;
      const destinationGame =
        state.stages[destinationStageId].connections.originConnections[
          destinationGameId
        ] || [];
      if (
        destinationGame.length >= 2 &&
        destinationGame.every(({ gameId }) => !!gameId)
      ) {
        console.warn("destination game already has a winner connection");
        return;
      }

      const newWinnerConnections = {
        ...state.stages[originStageId].connections.winnerConnections,
      };
      newWinnerConnections[originGameId] = newWinnerConnection;
      state.stages[originStageId].connections.winnerConnections =
        newWinnerConnections;
    },
    toggleConnectionMode: (
      state,
      action: PayloadAction<{
        bool: boolean;
      }>
    ) => {
      const { bool } = action.payload;
      state.connectionMode = bool;
    },
  },
});

export const {
  addOriginConnectionForGame,
  beginLookingForLoserConnection,
  beginLookingForNextStageConnection,
  cancelLookingForLoserConnection,
  cancelLookingForNextStageConnection,
  initBracketEvent,
  removeLoserConnectionForGame,
  removeWinnerConnectionForGame,
  setBrackets,
  setBracketStageInfo,
  setConnections,
  setLoserConnectionForGame,
  setSelectedGame,
  setWinnerConnectionForGame,
  toggleConnectionMode,
} = bracketManagerSlice.actions;
