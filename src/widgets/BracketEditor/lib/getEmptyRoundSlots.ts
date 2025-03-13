import type { BracketGame, BracketRows } from "@/entities/Bracket";

export function getEmptyRoundSlots({
  bracketNumber,
  roundNumber,
  brackets,
  rows,
}: {
  bracketNumber: number;
  roundNumber: number;
  brackets: BracketGame[][][];
  rows: BracketRows;
}): number[] {
  let lastRunning = {
    rowStart: 1,
    rowEnd: 1,
  };
  if (!Object.keys(rows).length) return [];
  const games = brackets[bracketNumber][roundNumber];
  const factor = !roundNumber ? 1 : 2 ** roundNumber;
  const available = games.reduce((all, game, index) => {
    const row = rows[game.id];
    if (!row) return all;
    const lastRunningClone = { ...lastRunning };
    lastRunning = row;
    const diff = row.rowStart - lastRunningClone.rowEnd;
    if (diff >= factor) {
      const newSlots = new Array(Math.floor(diff / factor))
        .fill(index)
        .map((_, i) => index + i);
      return [...all, ...newSlots];
    }
    return all;
  }, []);

  return available;
}
