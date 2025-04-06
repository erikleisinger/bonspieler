import { generateTournament } from "@/shared/utils/generateTournament";
import type { GeneratedBracket } from "@/modules/tournament-stage-wizard/shared/types";

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
