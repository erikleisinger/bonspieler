import type {
  BracketConnectionRegularTeam,
  BracketConnections,
  BracketGame,
  BracketRows,
} from "../lib";
import { BracketRowWithId } from "./types/BracketRows";
export function calculateRowSpanForGame({
  connections,
  game,
  roundIndex,
  rowsIndex,
  rowsArray,
}: {
  connections: BracketConnections;
  game: BracketGame;
  roundIndex: number;
  rowsIndex: BracketRows;
  rowsArray: BracketRowWithId[];
}): BracketRowWithId {
  /**
   * Find all games in previous round that are connected to this game
   * I.e. the winners of those games advance to the game being placed.
   */
  const gameConnections = (connections[game.id]?.teams || [])
    .filter(({ gameId, isWinner }) => !!gameId && isWinner)
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
  } else {
    /** Sort games by highest row span to lowest row span */

    const upperOriginGame = gameConnections[0];
    const lowerOriginGame = gameConnections[1] || gameConnections[0];

    const upperOrigin = rowsIndex[upperOriginGame.gameId];
    const lowerOrigin = rowsIndex[lowerOriginGame.gameId];
    rowEnd = lowerOrigin.rowEnd * 2 - 1;
    rowStart = upperOrigin.rowStart * 2 - 1;

    /**
     * In instances where the the vertical position of the game cannot
     * be calculated by simply taking the middle of the two origin games,
     * i.e. when the row-span of the origin games is not the same,
     * find the vertical difference between those origin games and use it to offset
     * the row span of the game being place.
     */

    const upperOriginDiff = upperOrigin.rowEnd - upperOrigin.rowStart;
    const lowerOriginDiff = lowerOrigin.rowEnd - lowerOrigin.rowStart;
    const verticalDiff = upperOriginDiff - lowerOriginDiff;

    if (verticalDiff > 0) {
      rowStart += verticalDiff;
    } else if (verticalDiff < 0) {
      rowEnd += verticalDiff;
    }
  }

  /**
   * Account for instances where the game is being placed in a position where it overlaps with games above it
   */

  const lastGame = rowsArray[rowsArray.length - 1];
  if (lastGame) {
    const { rowEnd: lastGameRowEnd } = lastGame;
    if (lastGameRowEnd > rowStart) {
      const rowDiff = rowEnd - rowStart;
      rowStart = lastGameRowEnd;
      rowEnd = lastGameRowEnd + rowDiff;
    }
  }

  return {
    id: game.id,
    rowStart,
    rowEnd,
  };
}
