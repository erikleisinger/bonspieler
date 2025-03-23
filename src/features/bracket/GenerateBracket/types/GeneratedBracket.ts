import {
  BracketDrawTimes,
  BracketGameType,
  BracketReadableIdIndex,
  BracketSchedule,
} from "@/entities/Bracket";
import {
  LoserConnections,
  OriginConnections,
  WinnerConnections,
} from "@/entities/Bracket/BracketGameConnections";

export interface GeneratedBracket {
  brackets: BracketGameType[][][];
  drawTimes: BracketDrawTimes;
  loserConnections: LoserConnections;
  numTeams: number;
  numWinners: number[];
  originConnections: OriginConnections;
  schedule: BracketSchedule;
  winnerConnections: WinnerConnections;
}
