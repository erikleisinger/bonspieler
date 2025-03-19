import { PayloadAction } from "@reduxjs/toolkit";
import type { BracketEventState } from "../bracketEventSlice";
import type { BracketEvent } from "@/entities/Bracket/types";

export const setBracketEventDrawTimes = (
  state: BracketEventState,
  action: PayloadAction<BracketEvent["drawTimes"]>
) => {
  if (!state.bracket) return;
  state.bracket.drawTimes = action.payload;
};
