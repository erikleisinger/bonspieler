import type {
  BracketEvent,
  BracketRows,
  BracketGameType,
} from "@/entities/Bracket";
import type { Nullable } from "@/shared/types";
export type ViewableBracketEvent = BracketEvent & {
  currentlyViewingBracket: number;
  lookingForLoserConnection: Nullable<string>;
  lookingToAssignTeam: Nullable<string>;
  order: number;
  selectedDraw: Nullable<number>;
  selectedGame: Nullable<BracketGameType>;
  rows: BracketRows;
};
