export interface BracketRow {
  rowStart: number;
  rowEnd: number;
}

export interface BracketRows {
  [gameId: string]: BracketRow;
}
