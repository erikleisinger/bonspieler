import type { BracketConnection, BracketGame } from "@/entities/Bracket";
export const DEFAULT_CONNECTION: BracketConnection = {
  winnerTo: null,
  loserTo: null,
  teams: [
    {
      teamId: null,
      gameId: null,
      isWinner: false,
    },
    {
      teamId: null,
      gameId: null,
      isWinner: false,
    },
  ],
};

export const DEFAULT_GAME: BracketGame = {
  id: "",
  bracketNumber: 0,
  roundNumber: 0,
  isSeed: false,
};
