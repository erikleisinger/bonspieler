import type {
  BracketGame,
  BracketConnections,
  BracketRows,
} from "@/entities/Bracket";
import type { Nullable } from "@/shared/types";

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
  AddBracket = "addBracket",
  SetNumSheets = "setNumSheets",
  RemoveBracket = "removeBracket",
  SetSchedule = "setSchedule",
  ViewDraw = "viewDraw",
  LookToAssignTeam = "lookToAssignTeam",
  CancelLookToAssignTeam = "cancelLookToAssignTeam",
  AssignTeamToGame = "assignTeamToGame",
}

export interface SetInitialStateAction {
  type: BracketEditorActionName.SetInitialState;
  args: {
    connections: BracketConnections;
    brackets: BracketGame[][][];
    readableIdIndex: { [readableId: string]: string };
    schedule: { [gameId: string]: number };
  };
}

export interface SetRowsAction {
  type: BracketEditorActionName.SetRows;
  args: {
    rows: BracketRows;
  };
}

export interface RemoveWinnerConnectionAction {
  type: BracketEditorActionName.RemoveWinnerConnection;
  args: {
    gameId: string;
  };
}

export interface LookForWinnerConnectionAction {
  type: BracketEditorActionName.LookForWinnerConnection;
  args: {
    gameId: string;
    gameIndex: number;
    bracketNumber: number;
    roundNumber: number;
  };
}
export interface CancelLookForWinnerConnectionAction {
  type: BracketEditorActionName.CancelLookForWinnerConnection;
  args: null;
}

export interface AddWinnerConnectionAction {
  type: BracketEditorActionName.AddWinnerConnection;
  args: {
    originGameId: string;
    destinationGameId: string;
  };
}

export interface LookForLoserConnectionAction {
  type: BracketEditorActionName.LookForLoserConnection;
  args: {
    gameId: string;
    bracketNumber: number;
  };
}
export interface CancelLookForLoserConnectionAction {
  type: BracketEditorActionName.CancelLookForLoserConnection;
  args: null;
}
export interface AddLoserConnectionAction {
  type: BracketEditorActionName.AddLoserConnection;
  args: {
    originGameId: string;
    destinationGameId: string;
  };
}
export interface RemoveLoserConnectionAction {
  type: BracketEditorActionName.RemoveLoserConnection;
  args: {
    gameId: string;
  };
}

export interface AddGameToRoundAction {
  type: BracketEditorActionName.AddGameToRound;
  args: {
    bracketNumber: number;
    roundNumber: number;
    onSuccess?: (game: BracketGame) => void;
  };
}

export interface RemoveGameFromRoundAction {
  type: BracketEditorActionName.RemoveGameFromRound;
  args: {
    gameId: string;
    roundNumber: number;
    bracketNumber: number;
  };
}
export interface ToggleSeedAction {
  type: BracketEditorActionName.ToggleSeed;
  args: {
    gameId: string;
    index: number;
    teamId: string;
  };
}

export interface AddBracketAction {
  type: BracketEditorActionName.AddBracket;
  args: {
    numWinners: number;
    numTeams: number;
    isSeeded: boolean;
  };
}

export interface SetNumSheetsAction {
  type: BracketEditorActionName.SetNumSheets;
  args: {
    numSheets: number;
    withSchedule: boolean;
  };
}

export interface RemoveBracketAction {
  type: BracketEditorActionName.RemoveBracket;
  args: {
    bracketIndex: number;
  };
}

export interface SetScheduleAction {
  type: BracketEditorActionName.SetSchedule;
  args: {
    schedule: { [gameId: string]: number };
  };
}

interface ViewDrawAction {
  type: BracketEditorActionName.ViewDraw;
  args: {
    drawNumber: Nullable<number>;
  };
}

interface LookToAssignTeamAction {
  type: BracketEditorActionName.LookToAssignTeam;
  args: {
    teamId: string;
  };
}

interface CancelLookToAssignTeamAction {
  type: BracketEditorActionName.CancelLookToAssignTeam;
  args: null;
}
interface AssignTeamToGameAction {
  type: BracketEditorActionName.AssignTeamToGame;
  args: {
    gameId: string;
    teamId: string;
  };
}

export type BracketEditorAction =
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
  | ToggleSeedAction
  | AddBracketAction
  | SetNumSheetsAction
  | RemoveBracketAction
  | SetScheduleAction
  | ViewDrawAction
  | LookToAssignTeamAction
  | CancelLookToAssignTeamAction
  | AssignTeamToGameAction;

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
  lookingToAssignTeam: Nullable<string>;
  numSheets: number;
  readableIdIndex: { [readableId: string]: string };
  rows: BracketRows;
  schedule: { [gameId: string]: number };
  selectedDraw: null;
}
