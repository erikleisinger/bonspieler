import {
  generateTournament,
  scheduleTournament,
} from "@/shared/utils/generateTournament";
import type { BracketDrawTimes } from "@/entities/Bracket";
import type { OriginConnections } from "@/entities/Bracket/BracketGameConnections";
import type { GeneratedBracket } from "../types";
function calculateTournamentSchedule(
  originConnections: OriginConnections,
  sheets: number
) {
  const { schedule: tournamentSchedule } = scheduleTournament(
    originConnections,
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
  const tournament = generateTournament(numTeams, numWinners, bracketIndex);
  const { brackets, connections } = tournament;

  const { originConnections, loserConnections, winnerConnections } =
    connections;

  const tournamentSchedule = calculateTournamentSchedule(
    originConnections,
    numSheets
  );
  const schedule = tournamentSchedule;

  const drawTimes: BracketDrawTimes = {};
  const numDrawTimes = Math.max(...Object.values(schedule));
  Array.from({ length: numDrawTimes }).forEach((_, index) => {
    drawTimes[index + 1] = null;
  });

  return {
    brackets,
    drawTimes,
    loserConnections,
    numTeams,
    numWinners,
    originConnections,
    schedule,
    winnerConnections,
  };
}
