import { PayloadAction } from "@reduxjs/toolkit";
import { BracketEventState } from "../bracketEventSlice";
import { BracketEvent } from "@/entities/Bracket/types";

export function updateBracketEvent(
  state: BracketEventState,
  action: PayloadAction<Partial<BracketEvent>>
) {
  if (!state.bracket) return;
  state.bracket = {
    ...state.bracket,
    ...action.payload,
  };
}
