import {
  generateTournament,
  scheduleTournament,
} from "@erikleisinger/bracket-generator";
import type { BracketConnections, BracketDrawTimes } from "@/entities/Bracket";
import type {
  OriginConnections,
  WinnerConnections,
  LoserConnections,
} from "@/entities/Bracket/BracketGameConnections";
import type { GeneratedBracket } from "../types";
function calculateTournamentSchedule(
  connections: BracketConnections,
  sheets: number
) {
  const { schedule: tournamentSchedule } = scheduleTournament(
    connections,
    sheets
  );
  return tournamentSchedule;
}

export function generateBracket({
  numTeams,
  numWinners,
  numSheets,
  isSeeded = true,
  bracketIndex = 0,
}: {
  numTeams: number;
  numWinners: number[];
  numSheets: number;
  isSeeded: boolean;
  bracketIndex: number;
}): GeneratedBracket {
  const tournament = generateTournament(numTeams, numWinners);
  const { brackets, connections } = tournament;
  const tournamentSchedule = calculateTournamentSchedule(
    connections,
    numSheets
  );
  const schedule = tournamentSchedule;

  const { winnerConnections, loserConnections, originConnections } =
    Object.entries(connections).reduce<{
      winnerConnections: WinnerConnections;
      loserConnections: LoserConnections;
      originConnections: OriginConnections;
    }>(
      (all, [gameId, connection]) => {
        const { winnerTo, loserTo, teams } = connection;
        return {
          winnerConnections: {
            ...all.winnerConnections,
            [gameId]: winnerTo || null,
          },
          loserConnections: {
            ...all.loserConnections,
            [gameId]: loserTo || null,
          },
          originConnections: {
            ...all.originConnections,
            [gameId]: teams.map((t) => {
              const { isWinner, gameId } = t;
              return {
                isWinner,
                gameId,
              };
            }),
          },
        };
      },
      {
        winnerConnections: {},
        loserConnections: {},
        originConnections: {},
      }
    );

  const drawTimes: BracketDrawTimes = {};
  const numDrawTimes = Math.max(...Object.values(schedule));
  Array.from({ length: numDrawTimes }).forEach((_, index) => {
    drawTimes[index + 1] = null;
  });

  const bracketsWithCorrectBracketNumber = brackets.map(
    (rounds, thisBracketIndex) =>
      rounds.map((games) =>
        games.map((game) => ({
          ...game,
          bracketNumber: thisBracketIndex,
        }))
      )
  );

  return {
    brackets: bracketsWithCorrectBracketNumber,
    drawTimes,
    loserConnections,
    numTeams,
    numWinners,
    originConnections,
    schedule,
    winnerConnections,
  };
}
