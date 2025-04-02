import {
  generateTournament,
  // scheduleTournament,
} from "@/shared/utils/generateTournament";
// import type { BracketDrawTimes } from "@/entities/Bracket";
// import type { OriginConnections } from "@/entities/Bracket/BracketGameConnections";
import type { GeneratedBracket } from "../types";
// function calculateTournamentSchedule(
//   originConnections: OriginConnections,
//   sheets: number
// ) {
//   const { schedule: tournamentSchedule } = scheduleTournament(
//     originConnections,
//     sheets
//   );
//   return tournamentSchedule;
// }

export function generateBracket({
  numTeams,
  numWinners,
  bracketIndex = 0,
}: {
  numTeams: number;
  numWinners: number[];
  bracketIndex: number;
}): GeneratedBracket {
  const tournament = generateTournament(numTeams, numWinners, bracketIndex);
  const { brackets, connections } = tournament;

  const { originConnections, loserConnections, winnerConnections } =
    connections;

  return {
    brackets,
    loserConnections,
    numTeams,
    numWinners: numWinners.reduce((a, c) => a + c, 0),
    originConnections,
    winnerConnections,
  };
}
