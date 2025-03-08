export interface BracketRow {
  rowStart: number;
  rowEnd: number;
}

export interface BracketRowWithId extends BracketRow {
  id: string;
}

export interface BracketRows {
  [gameId: string]: BracketRow;
}
