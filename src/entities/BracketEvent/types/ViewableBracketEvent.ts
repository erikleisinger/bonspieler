import type {
  BracketEvent,
  BracketRows,
  BracketGameType,
} from "@/entities/Bracket";
import type { Nullable } from "@/shared/types";
export type ViewableBracketEvent = BracketEvent & {
  availableGames: string[];
  currentlyViewingBracket: number;
  lookingForLoserConnection: Nullable<string>;
  selectedDraw: Nullable<number>;
  selectedGame: Nullable<BracketGameType>;
  rows: BracketRows;
};
