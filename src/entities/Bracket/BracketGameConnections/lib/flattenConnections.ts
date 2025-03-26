import type { BracketGameType } from "../..";
import type { OriginConnections } from "../types";
export function flattenConnections({
  brackets,
  originConnections,
}: {
  brackets: BracketGameType[][][];
  originConnections: OriginConnections;
}) {
  const games = brackets.flat().flat();
  return games.reduce((all, { id: gameId }) => {
    return {
      ...all,
      [gameId]: {
        teams: originConnections[gameId] || [
          {
            gameId: null,
          },
          { gameId: null },
        ],
      },
    };
  }, {});
}
