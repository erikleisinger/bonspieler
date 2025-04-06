import type { BracketEvent } from "@/modules/bracket-manager/shared/types";
import type {
  WinnerConnections,
  LoserConnections,
  OriginConnections,
} from "@/modules/bracket-manager/shared/types";

export interface GeneratedBracket {
  brackets: BracketEvent;
  connections: {
    loserConnections: LoserConnections;
    originConnections: OriginConnections;
    winnerConnections: WinnerConnections;
  };
  numTeams: number;
  numWinners: number;
}
