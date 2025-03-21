import { BracketEventState } from "../bracketEventSlice";
import { defaultState } from "../default-state";
export function resetState(state: BracketEventState) {
  state.bracket = defaultState();
}
