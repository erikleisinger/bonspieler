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
  gameIndex: {
    [key: string]: BracketGameType;
  };
  loserConnections: LoserConnections;
  numTeams: number;
  numWinners: number[];
  originConnections: OriginConnections;
  readableIdIndex: BracketReadableIdIndex;
  schedule: BracketSchedule;
  winnerConnections: WinnerConnections;
}
