import { createContext } from "react";
import type { Nullable } from "@/types";
import type { BracketGame } from "@/entities/Bracket";

function editingDisabled() {
  console.warn("Editing is not enabled");
}

export const BracketEditingContext = createContext<{
  availableGames: string[];
  editing: boolean;
  lookingForWinnerConnection: Nullable<{
    gameId: string;
    gameIndex: number;
    bracketNumber: number;
    roundNumber: number;
  }>;
  lookingForLoserConnection: Nullable<string>;
  numSheets: number;
  numWinners: number[];
  selectedDraw: Nullable<number>;
  addGameToRound: ({
    bracketNumber,
    roundNumber,
    onSuccess,
  }: {
    bracketNumber: number;
    roundNumber: number;
    onSuccess?: (game: BracketGame) => void;
  }) => void;
  addLoserConnection: (gameId: string) => void;
  addWinnerConnection: (destinationGameId: string) => void;
  deselectAll: () => void;
  lookForWinnerConnection: (
    gameId: string,
    gameIndex: number,
    bracketNumber: number,
    roundNumber: number
  ) => void;
  lookForLoserConnection: ({
    gameId,
    bracketNumber,
  }: {
    gameId: string;
    bracketNumber: number;
  }) => void;
  removeGameFromRound: ({
    gameId,
    roundNumber,
    bracketNumber,
  }: {
    gameId: string;
    roundNumber: number;
    bracketNumber: number;
  }) => void;
  removeLoserConnection: (gameId: string) => void;
  removeWinnerConnection: (gameId: string) => void;
  setSelectedDraw: (drawNumber: Nullable<number>) => void;
  showEventEditor: (tab: string) => void;
  toggleSeed: ({
    gameId,
    index,
    teamId,
  }: {
    gameId: string;
    index: number;
    teamId: string;
  }) => void;
  /**
   *
   * @param newNumSheets
   * @param withSchedule will recalculate schedule if true
   * @returns
   */
  updateNumSheets: (newNumSheets: number, withSchedule: boolean) => void;
  lookToAssignTeam: ({ teamId }: { teamId: string }) => void;
  lookingToAssignTeam: Nullable<string>;
  assignTeamToGame: ({ gameId }: { gameId: string }) => void;
}>({
  availableGames: [],
  editing: false,
  lookingForLoserConnection: null,
  lookingForWinnerConnection: null,
  lookingToAssignTeam: null,
  numSheets: 8,
  numWinners: [],
  selectedDraw: null,
  addGameToRound: editingDisabled,
  addLoserConnection: editingDisabled,
  addWinnerConnection: editingDisabled,
  deselectAll: editingDisabled,
  lookForLoserConnection: editingDisabled,
  lookForWinnerConnection: editingDisabled,
  removeGameFromRound: editingDisabled,
  removeLoserConnection: editingDisabled,
  removeWinnerConnection: editingDisabled,
  setSelectedDraw: editingDisabled,
  showEventEditor: editingDisabled,
  toggleSeed: editingDisabled,
  lookToAssignTeam: editingDisabled,
  updateNumSheets: editingDisabled,
  assignTeamToGame: editingDisabled,
});
