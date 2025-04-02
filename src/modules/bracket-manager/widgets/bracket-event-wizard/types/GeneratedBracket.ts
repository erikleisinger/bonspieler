import type { BracketEvent } from "@/modules/bracket-manager/shared/types";
import type {
  WinnerConnections,
  LoserConnections,
  OriginConnections,
} from "@/modules/bracket-manager/shared/types";

export interface GeneratedBracket {
  brackets: BracketEvent;
  loserConnections: LoserConnections;
  numTeams: number;
  numWinners: number;
  originConnections: OriginConnections;
  winnerConnections: WinnerConnections;
}
