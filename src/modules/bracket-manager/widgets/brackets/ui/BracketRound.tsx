import type { BracketRows } from "../types";
import type { BracketGame } from "@/modules/bracket-manager/shared/types";
import { GAME_HEIGHT, GAME_PADDING } from "../lib/constants/style";

export default function BracketRound({
  children,
  games,
  rows,
  roundIndex,
}: {
  children?: React.ReactNode;
  games: BracketGame[];
  rows: BracketRows;
  roundIndex: number;
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
    <div className="pointer-events-none bracket-row z-10">
      <div className="h-8" />
      <div
        className={`relative  grid `}
        style={{
          ...getRowDefinition(),
        }}
      >
        {children}
      </div>
    </div>
  );
}
