import { createSlice } from "@reduxjs/toolkit";
import type {
  BracketEvent,
  BracketGame,
  LoserConnections,
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
  brackets: BracketEvent;
  connections: {
    winnerConnections: WinnerConnections;
    loserConnections: LoserConnections;
    originConnections: OriginConnections;
  };
  lookingForLoserConnection: Nullable<BracketGame>;
  readableIdIndex: ReadableIdIndex;
  selectedGame: Nullable<BracketGame>;
  availableGameIds: string[];
}

export interface BracketManagerStoreState {
  [stageId: string]: BracketManagerState;
}

const initialState: BracketManagerStoreState = {};

export const bracketManagerSlice = createSlice({
  name: "bracketManager",
  initialState,
  reducers: {
    beginLookingForLoserConnection: (
      state,
      action: { payload: { stageId: string; gameId: string } }
    ) => {
      const { stageId, gameId } = action.payload;
      if (!(state || {})[stageId]) {
        return;
      }
      const game = state[stageId].brackets
        .flat()
        .flat()
        .find(({ id }) => id === gameId);
      if (!game) {
        console.warn(
          "could not look for loser connection: origin game not found"
        );
        return;
      }

      state[stageId].lookingForLoserConnection = game;

      state[stageId].availableGameIds = state[stageId].brackets
        .flat()
        .flat()
        .filter(({ id, bracketNumber }) => {
          if (bracketNumber <= game.bracketNumber) return false;
          const originConnections =
            state[stageId].connections.originConnections[id] || [];
          if (originConnections.length < 2) return true;
          return originConnections.some(({ gameId }) => !gameId);
        })
        .map(({ id }) => id);
    },
    cancelLookingForLoserConnection: (
      state,
      action: { payload: { stageId: string } }
    ) => {
      const { stageId } = action.payload;
      if (!(state || {})[stageId]) {
        return;
      }
      state[stageId].lookingForLoserConnection = null;
      state[stageId].availableGameIds = [];
    },
    initBracketEvent: (state, action: { payload: { stageId: string } }) => {
      const { stageId } = action.payload;
      state[stageId] = {
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
        readableIdIndex: {},
        selectedGame: null,
        availableGameIds: [],
      };
    },
    removeLoserConnectionForGame: (
      state,
      action: { payload: { stageId: string; gameId: string } }
    ) => {
      const { stageId, gameId } = action.payload;
      if (!(state || {})[stageId]) {
        console.warn("bracketManager state not initialized");
        return;
      }

      const currentLoserDestination =
        state[stageId].connections.loserConnections[gameId]?.gameId;
      if (!currentLoserDestination) {
        console.warn("could not remove loser connection, as it does not exist");
        return;
      }
      state[stageId].connections.loserConnections[gameId] = null;

      const newDestinationOrigins = (
        state[stageId].connections.originConnections[currentLoserDestination] ||
        []
      ).map((o) => ({
        ...o,
        gameId: o.gameId === gameId ? null : o.gameId,
      }));
      state[stageId].connections.originConnections[currentLoserDestination] =
        newDestinationOrigins;
    },
    setBrackets: (
      state,
      action: { payload: { stageId: string; brackets: BracketEvent } }
    ) => {
      const { stageId, brackets } = action.payload;
      if (!(state || {})[stageId]) {
        console.warn("bracketManager state not initialized");
        return;
      }

      state[stageId].brackets = brackets;
      state[stageId].readableIdIndex = generateReadableIdIndex(brackets);
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
      if (!(state || {})[stageId]) {
        console.warn("bracketManager state not initialized");
        return;
      }
      state[stageId].connections = {
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
          id: string;
          name: string;
          order: number;
          type: string;
        };
      }
    ) => {
      const { stageId, id, name, order, type } = action.payload;
      if (!(state || {})[stageId]) {
        console.warn("bracketManager state not initialized");
        return;
      }
      state[stageId].id = id;
      state[stageId].name = name;
      state[stageId].order = order;
      state[stageId].type = type;
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
      if (!state || !state[stageId]) {
        console.warn("bracketManager state not initialized");
        return;
      }
      if (typeof selectedGameOrGameId === "string") {
        const game = state[stageId].brackets
          .flat()
          .flat()
          .find((game) => game.id === selectedGameOrGameId);
        if (!game) {
          console.warn("could not set selected game: game not found");
          return;
        }
        state[stageId].selectedGame = game;
      } else {
        state[stageId].selectedGame = selectedGameOrGameId;
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
      if (!(state || {})[stageId]) {
        console.warn("bracketManager state not initialized");
        return;
      }
      const destinationOrigins =
        state[stageId].connections.originConnections[destinationGameId] || [];
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

      state[stageId].connections.originConnections[destinationGameId] =
        newDestinationOrigins;

      state[stageId].connections.loserConnections[originGameId] = {
        gameId: destinationGameId,
        stageId,
      };
      state[stageId].lookingForLoserConnection = null;
      state[stageId].availableGameIds = [];
    },
  },
});

export const {
  beginLookingForLoserConnection,
  cancelLookingForLoserConnection,
  initBracketEvent,
  removeLoserConnectionForGame,
  setBrackets,
  setBracketStageInfo,
  setConnections,
  setLoserConnectionForGame,
  setSelectedGame,
} = bracketManagerSlice.actions;
