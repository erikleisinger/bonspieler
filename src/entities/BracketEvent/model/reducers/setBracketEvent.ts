import { PayloadAction } from "@reduxjs/toolkit";
import type { BracketEvent } from "@/entities/Bracket";
import type { BracketEventState } from "../bracketEventSlice";
import { defaultState } from "../default-state";
// Define the reducer function
export const setBracketEvent = (
  state: BracketEventState,
  action: PayloadAction<BracketEvent>
) => {
  const { id, name } = action.payload;
  state.bracket = {
    ...defaultState(),
    id,
    name,
  };
};
