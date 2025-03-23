import type { BracketEventStoreState } from "./bracketEventSlice";
export const defaultState = (): BracketEventStoreState["bracket"] => ({
  id: null,
  lookingForLoserConnection: null,
  lookingToAssignTeam: null,
  name: "",
  num_start_teams: 16,
  num_end_teams: 1,
  tournament_id: null,
  order: 0,
});
