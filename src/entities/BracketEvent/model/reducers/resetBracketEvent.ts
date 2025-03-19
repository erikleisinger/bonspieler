import { BracketEventState } from "../bracketEventSlice";
import { defaultState } from "../default-state";
export function resetBracketEvent(state: BracketEventState) {
  state.bracket = defaultState();
}
