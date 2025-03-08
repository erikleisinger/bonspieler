import type {
  BracketConnections,
  BracketGame,
  BracketRows,
} from "@/entities/Bracket";
import type { Nullable } from "@/types";
import { lookForWinnerConnection } from "./lookForWinnerConnection";
import { removeWinnerConnection } from "./removeWinnerConnection";

export const DEFAULT_BRACKET_EDITOR_STATE: BracketEditorState = {
  availableGames: [],
  brackets: [],
  connections: {},
  editing: true,
  lookingForWinnerConnection: null,
  schedule: {},
  rows: {},
};

export enum BracketEditorActionName {
  SetInitialState = "setInitialState",
  SetRows = "setRows",
  RemoveWinnerConnection = "removeWinnerConnection",
  LookForWinnerConnection = "lookForWinnerConnection",
  CancelLookForWinnerConnection = "cancelLookForWinnerConnection",
  AddWinnerConnection = "addWinnerConnection",
}

interface SetInitialStateAction {
  type: BracketEditorActionName.SetInitialState;
  args: {
    connections: BracketConnections;
    brackets: BracketGame[][][];
    schedule: { [gameId: string]: number };
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
    gameIndex: number;
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

interface SetRowsAction {
  type: BracketEditorActionName.SetRows;
  args: {
    rows: BracketRows;
  };
}

type BracketEditorAction =
  | SetInitialStateAction
  | RemoveWinnerConnectionAction
  | LookForWinnerConnectionAction
  | CancelLookForWinnerConnectionAction
  | AddWinnerConnectionAction
  | SetRowsAction;

export interface BracketEditorState {
  availableGames: string[];
  brackets: BracketGame[][][];
  connections: BracketConnections;
  editing: boolean;
  lookingForWinnerConnection: Nullable<{
    gameId: string;
    bracketNumber: number;
    roundNumber: number;
  }>;
  rows: BracketRows;
  schedule: { [gameId: string]: number };
}
export function bracketEditorReducer(
  state: BracketEditorState,
  action: BracketEditorAction
) {
  switch (action.type) {
    case BracketEditorActionName.SetInitialState: {
      const { connections: newConnections, brackets, schedule } = action.args;
      if (!newConnections) {
        console.warn(
          "connections is required for removeWinnerConnection action"
        );
        return state;
      }

      const newState = {
        ...JSON.parse(JSON.stringify(DEFAULT_BRACKET_EDITOR_STATE)),
        connections: newConnections,
        brackets,
        schedule,
      };
      return newState;
    }
    case BracketEditorActionName.RemoveWinnerConnection: {
      const { gameId } = action.args;
      if (!gameId) {
        console.warn("gameId is required for removeWinnerConnection action");
        return state;
      }
      return removeWinnerConnection(state, { gameId });
    }
    case BracketEditorActionName.LookForWinnerConnection: {
      return lookForWinnerConnection(state, action.args);
    }
    case BracketEditorActionName.CancelLookForWinnerConnection: {
      const newState = {
        ...state,
        lookingForWinnerConnection: null,
        availableGames: [],
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
    case BracketEditorActionName.SetRows: {
      const { rows } = action.args;
      if (!rows) {
        console.warn("rows is required for setRows action");
        return state;
      }
      const newRows = {
        ...state.rows,
        ...rows,
      };
      const newState = {
        ...state,
        rows: newRows,
      };
      return newState;
    }
    default: {
      return state;
    }
  }
}
