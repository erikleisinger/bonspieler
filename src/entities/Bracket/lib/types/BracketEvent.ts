import {
  BracketConnections,
  BracketDrawTimes,
  BracketGame,
  BracketReadableIdIndex,
  BracketSchedule,
} from "./BracketReadableIdIndex";

export interface BracketEvent {
  brackets: BracketGame[][][];
  connections: BracketConnections;
  drawTimes: BracketDrawTimes;
  name: string;
  numTeams: number;
  numSheets: number;
  numWinners: number[];
  schedule: BracketSchedule;
  readableIdIndex: BracketReadableIdIndex;
}
