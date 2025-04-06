import { Nullable } from "@/shared/types";

export interface DestinationConnection {
  gameId: Nullable<string>;
  stageId: Nullable<string>;
}

export interface WinnerConnections {
  [gameId: string]: Nullable<DestinationConnection>;
}
export interface LoserConnections {
  [gameId: string]: Nullable<DestinationConnection>;
}
export interface OriginConnection {
  isWinner: boolean;
  gameId: Nullable<string>;
  stageId: Nullable<string>;
}

export interface OriginConnections {
  [gameId: string]: OriginConnection[];
}
