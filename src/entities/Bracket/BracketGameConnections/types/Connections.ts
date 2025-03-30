import { Nullable } from "@/shared/types";

export interface DestinationConnection {
  gameId: Nullable<string>;
  stageId: Nullable<string>;
  readableId: Nullable<string>;
  stageName: Nullable<string>;
}

export interface WinnerConnections {
  [gameId: string]: DestinationConnection;
}
export interface LoserConnections {
  [gameId: string]: DestinationConnection;
}
export interface OriginConnection {
  isWinner: boolean;
  gameId: Nullable<string>;
  stageId: Nullable<string>;
  readableId: Nullable<string>;
  stageName: Nullable<string>;
}

export interface OriginConnections {
  [gameId: string]: OriginConnection[];
}
