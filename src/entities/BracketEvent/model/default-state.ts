import type { BracketEventStoreState } from "./bracketEventSlice";
export const defaultState = (): BracketEventStoreState["bracket"] => ({
  currentlyViewingBracket: 0,
  id: null,
  lookingForLoserConnection: null,
  lookingToAssignTeam: null,
  name: "",
  num_start_teams: 16,
  num_end_teams: 1,
  selectedDraw: null,
  rows: {},
});
