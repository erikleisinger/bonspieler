import type { BracketGameType } from "@/entities/Bracket";
import { WinnerConnections } from "../BracketGameConnections";

export function getBracketEventEndTeams(
  brackets: BracketGameType[][][],
  winnerConnections: WinnerConnections
) {
  const count = brackets
    .flat()
    .flat()
    .filter(({ id }) => !winnerConnections[id]?.gameId).length;

  return count;
}
