import { createContext } from "react";
import {
  LoserConnections,
  OriginConnections,
  WinnerConnections,
} from "@/entities/Bracket/BracketGameConnections";
import { BracketGameType, BracketSchedule } from "@/entities/Bracket";
export const BracketContext = createContext<{
  originConnections: OriginConnections;
  winnerConnections: WinnerConnections;
  loserConnections: LoserConnections;
  brackets: BracketGameType[][][];
  schedule: BracketSchedule;
  loading: boolean;
  readableIdIndex: {
    [gameId: string]: string;
  };
  stageId: string;
}>({
  originConnections: {},
  winnerConnections: {},
  loserConnections: {},
  brackets: [],
  schedule: {},
  loading: false,
  readableIdIndex: {},
  stageId: "",
});
