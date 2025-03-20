import type { Nullable } from "@/shared/types";

/**
 * ISO format
 */
export interface BracketDrawTimes {
  [drawNum: number]: Nullable<string>;
}
