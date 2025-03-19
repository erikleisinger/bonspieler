import type { BracketRows } from "@/entities/Bracket";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { BracketEventState } from "../bracketEventSlice";
export function setBracketEventRows(
  state: BracketEventState,
  action: PayloadAction<BracketRows>
) {
  if (!state.bracket) return;
  const newRows = {
    ...state.bracket.rows,
    ...action.payload,
  };
  state.bracket.rows = newRows;
}
