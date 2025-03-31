import type { BracketGame, BracketRows } from "../../types";
import { GAME_HEIGHT } from "../../lib/constants/game";
const GAME_PADDING = 16;
export default function BracketRoundRow({
  children,
  roundIndex,
  games,
  rows,
  scale,
}: {
  children?: React.ReactNode;
  roundIndex: number;
  games: BracketGame[];
  rows: BracketRows;
  scale: number;
}) {
  function getRowDefinition() {
    const rowHeight =
      ((GAME_HEIGHT + GAME_PADDING) / (!roundIndex ? 1 : 2 ** roundIndex)) *
      (scale || 1);

    const numRowsForRound = Math.max(
      ...[...games.map(({ id }) => rows[id]?.rowEnd || 1)]
    );

    return {
      gridTemplateRows: `repeat(${
        numRowsForRound + 2 ** roundIndex
      }, ${rowHeight}px)`,
      width: `calc(350px * ${scale})`,
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
