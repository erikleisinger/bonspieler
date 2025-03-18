import {
  generateTournament,
  scheduleTournament,
} from "@erikleisinger/bracket-generator";
import { generateReadableIdIndex } from "./generateReadableIdIndex";
import type { BracketConnections } from "@/entities/Bracket";
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
}: {
  numTeams: number;
  numWinners: number[];
  numSheets: number;
  isSeeded: boolean;
}) {
  const tournament = generateTournament(numTeams, numWinners);
  const { brackets, connections } = tournament;
  const tournamentSchedule = calculateTournamentSchedule(
    connections,
    numSheets
  );
  const readableIdIndex = generateReadableIdIndex(brackets);
  const schedule = tournamentSchedule;

  let seededConnections = connections;
  if (!isSeeded) {
    seededConnections = {};
    Object.entries(connections).forEach(([key, value]) => {
      seededConnections[key] = {
        ...value,
        teams: value.teams.map((team) => ({
          ...team,
          teamId: team.teamId === "seed" ? null : team.teamId,
          isSeed: false,
        })),
      };
    });
  }

  return {
    brackets,
    connections: seededConnections,
    schedule,
    readableIdIndex,
    numTeams,
    numWinners,
  };
}
