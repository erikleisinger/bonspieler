import { Nullable } from "@/shared/types";

export interface BracketSchedule {
  [gameId: string]: Nullable<number>;
}
