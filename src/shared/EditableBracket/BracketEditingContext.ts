import { createContext } from "react";
import type { Nullable } from "@/types";
import type { BracketGame } from "@/entities/Bracket";
export const BracketEditingContext = createContext<{
  availableGames: string[];
  deselectAll: () => void;
  editing: boolean;
  lookingForWinnerConnection: Nullable<{
    gameId: string;
    gameIndex: number;
    bracketNumber: number;
    roundNumber: number;
  }>;
  lookingForLoserConnection: Nullable<string>;
  removeWinnerConnection: (gameId: string) => void;
  addWinnerConnection: (destinationGameId: string) => void;
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
  addLoserConnection: (gameId: string) => void;
  removeLoserConnection: (gameId: string) => void;
  addGameToRound: ({
    bracketNumber,
    roundNumber,
    onSuccess,
  }: {
    bracketNumber: number;
    roundNumber: number;
    onSuccess?: (game: BracketGame) => void;
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
  toggleSeed: ({
    gameId,
    index,
    teamId,
  }: {
    gameId: string;
    index: number;
    teamId: string;
  }) => void;
  numSheets: number;
}>({
  availableGames: [],
  editing: false,
  lookingForWinnerConnection: null,
  lookingForLoserConnection: null,
  removeWinnerConnection: (gameId: string) => {
    console.warn("Editing is not currently available.");
  },
  addWinnerConnection: (gameId: string) => {
    console.warn("Editing is not currently available.");
  },
  /**
   *
   * @param gameId
   * Will find available winner connections and highlight them.
   */
  lookForWinnerConnection: (
    gameId: string,
    gameIndex: number,
    bracketNumber: number,
    roundNumber: number
  ) => {},
  lookForLoserConnection: (gameId: string, bracketNumber: number) => {},
  addLoserConnection: (gameId: string) => {},
  removeLoserConnection: (gameId: string) => {},
  addGameToRound: (
    bracketNumber: number,
    roundNumber: number,
    onSuccess: (game: BracketGame) => void
  ) => {},
  removeGameFromRound: (
    gameId: string,
    roundNumber: number,
    bracketNumber: number
  ) => {},
  toggleSeed: ({
    gameId,
    index,
    teamId,
  }: {
    gameId: string;
    index: number;
    teamId: string | null;
  }) => {},
  deselectAll: () => {},
  numSheets: 8,
});
