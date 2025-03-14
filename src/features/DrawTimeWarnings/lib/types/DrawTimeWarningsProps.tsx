import type { BracketDrawTimes, BracketSchedule } from "@/entities/Bracket";
export interface DrawTimeWarningsProps {
  drawTimes: BracketDrawTimes;
  numDraws: number;
  numSheets: number;
  schedule: BracketSchedule;
}
