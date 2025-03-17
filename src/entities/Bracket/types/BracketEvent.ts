import {
  BracketConnections,
  BracketDrawTimes,
  BracketGame,
  BracketReadableIdIndex,
  BracketSchedule,
} from "./BracketReadableIdIndex";
import type { Nullable } from "@/shared/types";

export interface BracketEvent {
  brackets: BracketGame[][][];
  connections: BracketConnections;
  drawTimes: BracketDrawTimes;
  id: Nullable<string>;
  name: string;
  numTeams: number;
  numSheets: number;
  numWinners: number[];
  schedule: BracketSchedule;
  readableIdIndex: BracketReadableIdIndex;
}
