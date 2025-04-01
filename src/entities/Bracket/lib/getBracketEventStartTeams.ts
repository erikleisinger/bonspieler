import { BracketGameType } from "@/entities/Bracket";
import { OriginConnections } from "../BracketGameConnections";

export function getBracketEventStartTeams(
  brackets: BracketGameType[][][],
  originConnections: OriginConnections
) {
  return brackets
    .flat()
    .flat()
    .reduce((all, { id }) => {
      const origins = originConnections[id] || [];
      const atLeastTwoOrigins = Array.from({ length: 2 }).map(
        (_, i) => origins[i] || { gameId: null }
      );

      return (
        all + (atLeastTwoOrigins.filter(({ gameId }) => !gameId)?.length || 0)
      );
    }, 0);
}
