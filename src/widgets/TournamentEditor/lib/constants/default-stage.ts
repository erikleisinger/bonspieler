import {
  TournamentStageType,
  TournamentStage,
  TournamentBracketStage,
} from "../types/TournamentStage";
const DEFAULT_STAGE = {
  order: 0,
};

const DEFAULT_BRACKET_STAGE: Omit<TournamentBracketStage, "id"> = {
  ...DEFAULT_STAGE,
  type: TournamentStageType.Bracket,
  name: "New Bracket Event",
  brackets: [],
  connections: {},
  drawTimes: {},
  numTeams: 16,
  numSheets: 8,
  numWinners: [],
  schedule: {},
  readableIdIndex: {},
};

const DEFAULT_POOL_STAGE: Omit<TournamentStage, "id"> = {
  ...DEFAULT_STAGE,
  type: TournamentStageType.Pool,
  name: "New Pool Event",
};

const DEFAULT_POINTS_STAGE: Omit<TournamentStage, "id"> = {
  ...DEFAULT_STAGE,
  type: TournamentStageType.Points,
  name: "New Points Event",
};

const DEFAULTS = {
  [TournamentStageType.Bracket]: DEFAULT_BRACKET_STAGE,
  [TournamentStageType.Points]: DEFAULT_POINTS_STAGE,
  [TournamentStageType.Pool]: DEFAULT_POOL_STAGE,
};

export { DEFAULTS };
