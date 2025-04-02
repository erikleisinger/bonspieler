import type { BracketGame, BracketRows } from "../../types";
import { GAME_HEIGHT, GAME_PADDING } from "../../lib/constants/style";

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
      minWidth: "220px",
    };
  }

  return (
    <div
      className={`relative  grid `}
      style={{
        ...getRowDefinition(),
      }}
    >
      {children}
    </div>
  );
}
