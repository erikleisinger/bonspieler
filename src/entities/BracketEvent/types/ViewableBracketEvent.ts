import type { Nullable } from "@/shared/types";
import type { BracketRows } from "@/entities/Bracket";

export type ViewableBracketEvent = {
  id: Nullable<string>;
  name: string;
  currentlyViewingBracket: number;
  lookingForLoserConnection: Nullable<string>;
  lookingToAssignTeam: Nullable<string>;
  num_start_teams: number;
  num_end_teams: number;
  selectedDraw: Nullable<number>;
  rows: BracketRows;
};
