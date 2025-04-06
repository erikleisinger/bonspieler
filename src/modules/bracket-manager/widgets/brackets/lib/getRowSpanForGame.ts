import type { BracketRow } from "../types";
export function getRowSpanForGame(rows: BracketRow) {
  const { rowStart = 1, rowEnd = 2 } = rows || {};
  return {
    gridRow: `${rowStart} / ${rowEnd}`,
  };
}
