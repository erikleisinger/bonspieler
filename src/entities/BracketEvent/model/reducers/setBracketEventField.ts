import { PayloadAction } from "@reduxjs/toolkit";
import type { BracketEventState } from "../bracketEventSlice";
import type { ViewableBracketEvent } from "../../types";
export function setBracketEventField<K extends keyof ViewableBracketEvent>(
  field: K
) {
  return (
    state: BracketEventState,
    action: PayloadAction<ViewableBracketEvent[K]>
  ) => {
    if (!state.bracket) return;
    state.bracket[field] = action.payload;
  };
}
