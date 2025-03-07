import type { BracketConnections } from "@/entities/Bracket";

import { removeWinnerConnection } from "./removeWinnerConnection";

export enum BracketEditorActionName {
  SetInitialConnections = "setInitialConnections",
  RemoveWinnerConnection = "removeWinnerConnection",
  LookForWinnerConnection = "lookForWinnerConnection",
  CancelLookForWinnerConnection = "cancelLookForWinnerConnection",
  AddWinnerConnection = "addWinnerConnection",
}

interface SetInitialConnectionsAction {
  type: BracketEditorActionName.SetInitialConnections;
  args: {
    connections: BracketConnections;
  };
}

interface RemoveWinnerConnectionAction {
  type: BracketEditorActionName.RemoveWinnerConnection;
  args: {
    gameId: string;
  };
}

interface LookForWinnerConnectionAction {
  type: BracketEditorActionName.LookForWinnerConnection;
  args: {
    gameId: string;
    bracketNumber: number;
    roundNumber: number;
  };
}
interface CancelLookForWinnerConnectionAction {
  type: BracketEditorActionName.CancelLookForWinnerConnection;
  args: null;
}

interface AddWinnerConnectionAction {
  type: BracketEditorActionName.AddWinnerConnection;
  args: {
    originGameId: string;
    destinationGameId: string;
  };
}

type BracketEditorAction =
  | SetInitialConnectionsAction
  | RemoveWinnerConnectionAction
  | LookForWinnerConnectionAction
  | CancelLookForWinnerConnectionAction
  | AddWinnerConnectionAction;

export function bracketEditorReducer(
  state: {
    connections: BracketConnections;
    editing: boolean;
    lookingForWinnerConnection: {
      gameId: string;
      bracketNumber: number;
      roundNumber: number;
    } | null;
  },
  action: BracketEditorAction
) {
  switch (action.type) {
    case BracketEditorActionName.SetInitialConnections: {
      const { connections: newConnections } = action.args;
      if (!newConnections) {
        console.warn(
          "connections is required for removeWinnerConnection action"
        );
        return state;
      }
      const newState = {
        ...state,
        connections: newConnections,
      };
      return newState;
    }
    case BracketEditorActionName.RemoveWinnerConnection: {
      const { gameId } = action.args;
      if (!gameId) {
        console.warn("gameId is required for removeWinnerConnection action");
        return state;
      }
      const { connections } = state;
      const newConnections = removeWinnerConnection(gameId, connections);
      const newState = {
        ...state,
        connections: newConnections,
      };
      return newState;
    }
    case BracketEditorActionName.LookForWinnerConnection: {
      const { gameId, bracketNumber, roundNumber } = action.args;
      if (!gameId) {
        console.warn("gameId is required for lookForWinnerConnection action");
        return state;
      }

      if (typeof bracketNumber !== "number") {
        console.warn(
          "bracketNumber is required for lookForWinnerConnection action"
        );
        return state;
      }
      const newState = {
        ...state,
        lookingForWinnerConnection: {
          gameId,
          bracketNumber,
          roundNumber,
        },
      };
      return newState;
    }
    case BracketEditorActionName.CancelLookForWinnerConnection: {
      const newState = {
        ...state,
        lookingForWinnerConnection: null,
      };
      return newState;
    }
    case BracketEditorActionName.AddWinnerConnection: {
      const { originGameId, destinationGameId } = action.args;
      if (!originGameId) {
        console.warn("originGameId is required for addWinnerConnection action");
        return state;
      }
      if (!destinationGameId) {
        console.warn(
          "destinationGameId is required for addWinnerConnection action"
        );
        return state;
      }
      const { connections } = state;
      const originConnection = connections[originGameId];
      const destinationConnection = connections[destinationGameId];
      if (!originConnection) {
        console.warn(
          "originConnection is required for addWinnerConnection action"
        );
        return state;
      }
      if (!destinationConnection) {
        console.warn(
          "destinationConnection is required for addWinnerConnection action"
        );
        return state;
      }

      const newDestinationConnection = { ...destinationConnection };
      const newTeams = [...newDestinationConnection.teams];
      const availableTeamIndex = newTeams.findIndex(
        ({ gameId, teamId }) => !gameId && !teamId
      );
      if (availableTeamIndex === -1) {
        console.warn(
          "destination game does not have an available team slot for addWinnerConnection action"
        );
        return state;
      }
      newTeams.splice(availableTeamIndex, 1, {
        gameId: originGameId,
        teamId: null,
        isWinner: true,
      });
      newDestinationConnection.teams = newTeams;

      const newOriginConnection = {
        ...originConnection,
        winnerTo: destinationGameId,
      };

      const newConnections = {
        ...connections,
        [originGameId]: newOriginConnection,
        [destinationGameId]: newDestinationConnection,
      };
      const newState = {
        ...state,
        connections: newConnections,
      };
      return newState;
    }
    default: {
      return state;
    }
  }
}
