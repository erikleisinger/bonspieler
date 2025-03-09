import type {
  BracketConnections,
  BracketGame,
  BracketRows,
} from "@/entities/Bracket";
import type { Nullable } from "@/types";
import { lookForWinnerConnection } from "./lookForWinnerConnection";
import { lookForLoserConnection } from "./lookForLoserConnection";
import { removeWinnerConnection } from "./removeWinnerConnection";
import { addWinnerConnection } from "./addWinnerConnection";
import { addLoserConnection } from "./addLoserConnection";
import { removeLoserConnection } from "./removeLoserConnection";
import { addGameToRound } from "./addGameToRound";
import { removeGameFromRound } from "./removeGameFromRound";
import { toggleSeed } from "./toggleSeed";

export const DEFAULT_BRACKET_EDITOR_STATE: BracketEditorState = {
  availableGames: [],
  brackets: [],
  connections: {},
  editing: false,
  lookingForWinnerConnection: null,
  lookingForLoserConnection: null,
  readableIdIndex: {},
  schedule: {},
  rows: {},
};

export enum BracketEditorActionName {
  SetInitialState = "setInitialState",
  SetRows = "setRows",
  RemoveWinnerConnection = "removeWinnerConnection",
  LookForWinnerConnection = "lookForWinnerConnection",
  CancelLookForWinnerConnection = "cancelLookForWinnerConnection",
  CancelLookForLoserConnection = "cancelLookForLoserConnection",
  AddWinnerConnection = "addWinnerConnection",
  LookForLoserConnection = "lookForLoserConnection",
  AddLoserConnection = "addLoserConnection",
  RemoveLoserConnection = "removeLoserConnection",
  AddGameToRound = "addGameToRound",
  RemoveGameFromRound = "removeGameFromRound",
  ToggleSeed = "toggleSeed",
}

interface SetInitialStateAction {
  type: BracketEditorActionName.SetInitialState;
  args: {
    connections: BracketConnections;
    brackets: BracketGame[][][];
    readableIdIndex: { [readableId: string]: string };
    schedule: { [gameId: string]: number };
  };
}

interface SetRowsAction {
  type: BracketEditorActionName.SetRows;
  args: {
    rows: BracketRows;
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

interface LookForLoserConnectionAction {
  type: BracketEditorActionName.LookForLoserConnection;
  args: {
    gameId: string;
    bracketNumber: number;
  };
}
interface CancelLookForLoserConnectionAction {
  type: BracketEditorActionName.CancelLookForLoserConnection;
  args: null;
}
interface AddLoserConnectionAction {
  type: BracketEditorActionName.AddLoserConnection;
  args: {
    originGameId: string;
    destinationGameId: string;
  };
}
interface RemoveLoserConnectionAction {
  type: BracketEditorActionName.RemoveLoserConnection;
  args: {
    gameId: string;
  };
}

interface AddGameToRoundAction {
  type: BracketEditorActionName.AddGameToRound;
  args: {
    bracketNumber: number;
    roundNumber: number;
    onSuccess?: (game: BracketGame) => void;
  };
}

interface RemoveGameFromRoundAction {
  type: BracketEditorActionName.RemoveGameFromRound;
  args: {
    gameId: string;
    roundNumber: number;
    bracketNumber: number;
  };
}
interface ToggleSeed {
  type: BracketEditorActionName.ToggleSeed;
  args: {
    gameId: string;
    index: number;
    teamId: string;
  };
}

type BracketEditorAction =
  | SetInitialStateAction
  | RemoveWinnerConnectionAction
  | LookForWinnerConnectionAction
  | CancelLookForWinnerConnectionAction
  | AddWinnerConnectionAction
  | SetRowsAction
  | LookForLoserConnectionAction
  | CancelLookForLoserConnectionAction
  | AddLoserConnectionAction
  | RemoveLoserConnectionAction
  | AddGameToRoundAction
  | RemoveGameFromRoundAction
  | ToggleSeed;

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
  lookingForLoserConnection: Nullable<string>;
  readableIdIndex: { [readableId: string]: string };
  rows: BracketRows;
  schedule: { [gameId: string]: number };
}
export function bracketEditorReducer(
  state: BracketEditorState,
  action: BracketEditorAction
) {
  switch (action.type) {
    case BracketEditorActionName.SetInitialState: {
      const {
        connections: newConnections,
        brackets,
        schedule,
        readableIdIndex,
      } = action.args;
      if (!newConnections) {
        console.warn(
          "connections is required for removeWinnerConnection action"
        );
        return state;
      }

      const newState = {
        ...state,
        connections: newConnections,
        brackets,
        readableIdIndex,
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
      return addWinnerConnection(state, action.args);
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
    case BracketEditorActionName.LookForLoserConnection: {
      return lookForLoserConnection(state, action.args);
    }
    case BracketEditorActionName.CancelLookForLoserConnection: {
      const newState = {
        ...state,
        lookingForLoserConnection: null,
        availableGames: [],
      };
      return newState;
    }
    case BracketEditorActionName.AddLoserConnection: {
      return addLoserConnection(state, action.args);
    }
    case BracketEditorActionName.RemoveLoserConnection: {
      const { gameId } = action.args;
      return removeLoserConnection(state, gameId);
    }
    case BracketEditorActionName.AddGameToRound: {
      const { state: newState, newGame } = addGameToRound(state, action.args);

      if (action.args.onSuccess) {
        setTimeout(() => {
          action.args.onSuccess(newGame);
        }, 1);
      }
      return newState;
    }
    case BracketEditorActionName.RemoveGameFromRound: {
      const { gameId, bracketNumber, roundNumber } = action.args;
      return removeGameFromRound(state, {
        gameId,
        bracketNumber,
        roundNumber,
      });
    }
    case BracketEditorActionName.ToggleSeed: {
      const { gameId, index, teamId } = action.args;
      return toggleSeed(state, { gameId, index, teamId });
    }
    default: {
      return state;
    }
  }
}
