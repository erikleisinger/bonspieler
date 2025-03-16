import {
  type BracketEditorState,
  BracketEditorActionName,
  type BracketEditorAction,
} from "../types/reducer-types";

import { lookForWinnerConnection } from "./lookForWinnerConnection";
import { lookForLoserConnection } from "./lookForLoserConnection";
import { removeWinnerConnection } from "./removeWinnerConnection";
import { addWinnerConnection } from "./addWinnerConnection";
import { addLoserConnection } from "./addLoserConnection";
import { removeLoserConnection } from "./removeLoserConnection";
import { addGameToRound } from "./addGameToRound";
import { removeGameFromRound } from "./removeGameFromRound";
import { toggleSeed } from "./toggleSeed";
import { addBracket } from "./addBracket";
import { removeBracket } from "./removeBracket";
import { scheduleTournament } from "@/shared/utils/generate";
import { lookToAssignTeam } from "./lookToAssignTeam";
import { assignTeamToGame } from "./assignTeamToGame";

export const DEFAULT_BRACKET_EDITOR_STATE: BracketEditorState = {
  availableGames: [],
  brackets: [],
  connections: {},
  editing: false,
  lookingForWinnerConnection: null,
  lookingForLoserConnection: null,
  lookingToAssignTeam: null,
  numSheets: 8,
  readableIdIndex: {},
  selectedDraw: null,
  schedule: {},
  rows: {},
};

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

    case BracketEditorActionName.AddBracket: {
      return addBracket(state, action.args);
    }

    case BracketEditorActionName.SetNumSheets: {
      const { numSheets, withSchedule } = action?.args || {};
      if (!numSheets) return state;
      if (withSchedule) {
        const newConnections = { ...state.connections };
        const { schedule } = scheduleTournament(newConnections, numSheets);
        return {
          ...state,
          numSheets,
          schedule,
        };
      } else {
        return {
          ...state,
          numSheets,
        };
      }
    }
    case BracketEditorActionName.RemoveBracket: {
      return removeBracket(state, action.args);
    }
    case BracketEditorActionName.SetSchedule: {
      return {
        ...state,
        schedule: action.args.schedule,
      };
    }
    case BracketEditorActionName.ViewDraw: {
      const { drawNumber } = action.args;
      return {
        ...state,
        selectedDraw: drawNumber,
      };
    }
    case BracketEditorActionName.LookToAssignTeam: {
      return lookToAssignTeam(state, action.args);
    }
    case BracketEditorActionName.CancelLookToAssignTeam: {
      return {
        ...state,
        lookingToAssignTeam: null,
        availableGames: [],
      };
    }
    case BracketEditorActionName.AssignTeamToGame: {
      return assignTeamToGame(state, action.args);
    }
    default: {
      return state;
    }
  }
}
