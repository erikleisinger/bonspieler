import type {
  BracketConnections,
  BracketGame,
  BracketRows,
} from "@/entities/Bracket";
import { Nullable } from "@/types";
import { calculateRowSpanForGame } from "@/entities/Bracket";
import { BracketRowWithId } from "@/entities/Bracket/lib/types/BracketRows";
import { BracketConnectionRegularTeam } from "@/shared/utils/generate";

/**
 *
 * @param gameId game id to check for winner connections
 * @param connections all connections for the event
 *
 */

function getOriginConnectionsForGame(
  gameId: string,
  connections: BracketConnections
): BracketConnectionRegularTeam[] {
  const connection = connections[gameId];
  if (!connection) {
    return [];
  }
  const { teams = [] } = connection;
  if (!teams.length) return [];
  const winnerConnections = teams.filter(
    ({ gameId, teamId }) => !!gameId || !!teamId
  ) as BracketConnectionRegularTeam[];

  return winnerConnections;
}

/**
 *
 * @param gameId gameId to check for availability
 * @param connections connections between games for the event
 * @returns boolean representing the "availability" of a game.
 * A game is available when it has less than two origin games, i.e. games that's winners advance to this game.
 */

function isUnavailable(
  gameId: Nullable<string>,
  connections: BracketConnections
): boolean {
  if (!gameId) return true;
  const connection = connections[gameId];
  if (!connection) {
    return true;
  }
  const winnerConnections = getOriginConnectionsForGame(gameId, connections);
  if (winnerConnections.length === 2) return true;
  return false;
}

export function calculateAvailableGames({
  gameId,
  roundNumber,
  bracketNumber,
  connections,
  brackets,
  rows,
}: {
  gameId: string;
  gameIndex: number;
  roundNumber: number;
  bracketNumber: number;
  connections: BracketConnections;
  brackets: BracketGame[][][];
  rows: BracketRows;
}) {
  const availableGames: string[] = [];
  const theseRows = rows[gameId];
  const bracketRows: BracketRowWithId[] = [];
  brackets.forEach((bracket, bracketIndex) => {
    if (bracketIndex !== bracketNumber) return;
    bracket.forEach((round, roundIndex) => {
      if (roundIndex - 1 !== roundNumber) return;

      round.forEach((game) => {
        const pos = calculateRowSpanForGame({
          connections,
          game,
          roundIndex,
          rowsIndex: rows,
          rowsArray: bracketRows,
        });
        bracketRows.push(pos);
        if (isUnavailable(game.id, connections)) return;

        const gameRows = rows[game.id];
        const gameRowsRelative = {
          ...gameRows,
          rowStart: Math.ceil(gameRows.rowStart / 2),
          rowEnd: Math.ceil(gameRows.rowEnd / 2),
        };

        /**
         * Games in the next round that are exactly even vertically with the current game should be available.
         * We calculate even-aligned games here, to simplify finding highest/lowest later on.
         *
         */

        if (
          gameRowsRelative.rowStart === theseRows.rowStart &&
          gameRowsRelative.rowEnd === theseRows.rowEnd
        )
          availableGames.push(game.id);
      });
    });
  });

  /**
   * Calculate the position of next round games relatively to the origin round.
   * Next round rows are inflated by a factor of 2 so we need to divide by 2 to
   * put the row spans in the same scale as the origin round.
   */

  const bracketRowsRelativeToOrigin = bracketRows
    /**
     * Filter out games that are already available,
     * in effect this ensures we don't accidentally identify an evenly-aligned game as "highest above" or "lowest below"
     */
    .filter((row) => !availableGames.includes(row.id))
    .map((pos) => ({
      ...pos,
      rowStart: Math.ceil(pos.rowStart / 2),
      rowEnd: Math.ceil(pos.rowEnd / 2),
    }));

  /**
   * Calculate the highest game below the current game, and the lowest game above the current game.
   * Filtering out unavailable games happens after this reduce function,
   * to avoid false positives -- i.e., a game is considered the "lowest" but
   * in reality an unavailable game (i.e. two origin connections already defined) is the lowest, meaning a connection between
   * the origin game and the calculated lowest game would require skipping over an unavailable game,
   * leading to a connection that can break our grid layout.
   *
   */

  /**
   * @returns either the highest game below the current game, or null if there is no highest game below the current game.
   */
  const highestBelow = bracketRowsRelativeToOrigin.reduce(
    (currentHighest, current) => {
      // if (availableGames?.length) return currentHighest;
      if (current.rowStart < theseRows.rowStart) return currentHighest;
      if (!currentHighest) return current;
      if (current.rowStart < currentHighest.rowStart) return current;
      return currentHighest;
    },
    null as Nullable<BracketRowWithId>
  );

  /**
   * @returns either the lowest game above the current game, or null if there is no lowest game above the current game.
   */
  const lowestAbove = bracketRowsRelativeToOrigin.reduce(
    (currentLowest, current) => {
      if (current.rowEnd > theseRows.rowEnd) return currentLowest;

      if (!currentLowest) return current;
      if (current.rowEnd > currentLowest.rowEnd) return current;
      return currentLowest;
    },
    null as Nullable<BracketRowWithId>
  );

  /**
   * filtering out unavailable games (two origin connections already defined) happens after this reduce function,
   * see comment on lines 115-120 for reasoning
   */
  [highestBelow, lowestAbove].forEach((bracketRowDefinitionOrNull) => {
    if (!bracketRowDefinitionOrNull) return;
    const { id } = bracketRowDefinitionOrNull;
    if (isUnavailable(id, connections)) return;
    availableGames.push(id);
  });

  return availableGames;
}
