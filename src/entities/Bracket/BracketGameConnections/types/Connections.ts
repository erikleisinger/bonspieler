import { Nullable } from "@/shared/types";

export interface WinnerConnections {
  [gameId: string]: Nullable<string>;
}
export interface LoserConnections {
  [gameId: string]: Nullable<string>;
}
export interface OriginConnection {
  isWinner: boolean;
  gameId: Nullable<string>;
}

export interface OriginConnections {
  [gameId: string]: OriginConnection[];
}
