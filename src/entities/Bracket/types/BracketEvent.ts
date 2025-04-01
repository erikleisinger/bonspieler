import { BracketConnections } from "./BracketConnection";
import { BracketGameType } from "..";
import { BracketDrawTimes } from "..";
import { BracketSchedule } from "..";
import type { Nullable } from "@/shared/types";
import type { TournamentStageType } from "@/entities/Tournament";
export interface BracketEvent {
  brackets: BracketGameType[][][];
  connections: BracketConnections;
  drawTimes: BracketDrawTimes;
  id: Nullable<string>;
  name: string;
  numTeams: number;
  numSheets: number;
  numWinners: number[];
  schedule: BracketSchedule;
  type: TournamentStageType;
}
