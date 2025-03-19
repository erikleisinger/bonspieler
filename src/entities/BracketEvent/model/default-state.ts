import type { BracketEventState } from "./bracketEventSlice";
export const defaultState = (): BracketEventState["bracket"] => ({
  brackets: [],
  connections: {},
  currentlyViewingBracket: 0,
  drawTimes: {},
  id: null,
  lookingForLoserConnection: null,
  lookingToAssignTeam: null,
  name: "",
  numTeams: 16,
  numWinners: [],
  numSheets: 8,
  readableIdIndex: {},
  selectedDraw: null,
  selectedGame: null,
  schedule: {},
  rows: {},
});
