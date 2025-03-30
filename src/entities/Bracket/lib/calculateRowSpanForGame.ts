import type {
  BracketConnectionRegularTeam,
  BracketGame,
  BracketRows,
} from "../types";
import { BracketRowWithId } from "../types/BracketRows";
import type { OriginConnections } from "@/entities/Bracket/BracketGameConnections";
export function calculateRowSpanForGame({
  originConnections,
  game,
  roundIndex,
  rowsIndex,
  rowsArray,
}: {
  originConnections: OriginConnections;
  game: BracketGame;
  roundIndex: number;
  rowsIndex: BracketRows;
  rowsArray: BracketRowWithId[];
}): BracketRowWithId {
  /**
   * Find all games in previous round that are connected to this game
   * I.e. the winners of those games advance to the game being placed.
   */
  const gameConnections = (originConnections[game.id] || [])
    .filter(
      ({ gameId, isWinner, stageId: gameStageId }) =>
        !!gameId && isWinner && !gameStageId
    )
    .sort((a, b) => {
      const aRows = rowsIndex[a.gameId]?.rowEnd || 0;
      const bRows = rowsIndex[b.gameId]?.rowEnd || 0;
      return aRows - bRows;
    }) as BracketConnectionRegularTeam[];

  let rowStart = 1;
  let rowEnd = 2;
  if (!gameConnections.length) {
    // When a game has no origins, then we don't need to place a game vertically between its origin games.
    // We can just place it below the the current lowest game in the same round.

    const lastGame = rowsArray[rowsArray.length - 1];
    const { rowEnd: lastGameRowEnd = 1 } = lastGame || {};

    /**
     * Here 1 * roundIndex is to account for the fact that
     * the height of rows decreases as the round number increases.
     */

    rowStart = lastGameRowEnd;
    rowEnd = lastGameRowEnd + 1 * 2 ** roundIndex;
  } else if (gameConnections.length === 1) {
    const upperOriginGame = gameConnections[0];
    const upperOrigin = rowsIndex[upperOriginGame.gameId];
    rowStart = upperOrigin.rowStart * 2 - 1;
    rowEnd = rowStart + 2 ** roundIndex;
  } else if (gameConnections.length === 2) {
    /** Sort games by highest row span to lowest row span */
    const upperOriginGame = gameConnections[0];
    const lowerOriginGame = gameConnections[1];

    const upperOrigin = rowsIndex[upperOriginGame.gameId];
    const lowerOrigin = rowsIndex[lowerOriginGame.gameId];

    rowStart =
      (upperOrigin.rowStart * 2 - 1 + (lowerOrigin.rowStart * 2 - 1)) / 2;

    rowEnd = rowStart + 2 ** roundIndex;
  }

  return {
    id: game.id,
    rowStart,
    rowEnd,
  };
}
