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
  numWinnersArray,
  bracketIndex = 0,
}: {
  numTeams: number;
  numWinnersArray: number[];
  bracketIndex?: number;
}): GeneratedBracket {
  const tournament = generateTournament(
    numTeams,
    numWinnersArray,
    bracketIndex
  );
  const { brackets, connections } = tournament;

  return {
    brackets,
    connections,
    numTeams,
    numWinnersArray: numWinnersArray.reduce((a, c) => a + c, 0),
  };
}
