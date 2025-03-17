import type { BracketGame, BracketRows } from "../../types";
import { GAME_HEIGHT } from "../../lib/constants/game";
const GAME_PADDING = 16;
export default function BracketRoundRow({
  children,
  roundIndex,
  games,
  rows,
}: {
  children?: React.ReactNode;
  roundIndex: number;
  games: BracketGame[];
  rows: BracketRows;
}) {
  function getRowDefinition() {
    const rowHeight =
      (GAME_HEIGHT + GAME_PADDING) / (!roundIndex ? 1 : 2 ** roundIndex);

    const numRowsForRound = Math.max(
      ...[...games.map(({ id }) => rows[id]?.rowEnd || 1)]
    );

    return {
      gridTemplateRows: `repeat(${
        numRowsForRound + 2 ** roundIndex
      }, ${rowHeight}px)`,
    };
  }

  return (
    <div
      className={`relative  grid px-8 md:px-16 pt-4 md:pt-8 w-screen md:w-fit`}
      style={{
        ...getRowDefinition(),
      }}
    >
      {children}
    </div>
  );
}
