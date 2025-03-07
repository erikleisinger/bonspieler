export interface BracketConnectionSeedTeamId {
  teamId: string;
  gameId: null;
}

export interface BracketConnectionRegularTeamId {
  gameId: string;
  teamId: null;
}

export interface BracketConnectionEmptyTeamId {
  teamId: null;
  gameId: null;
}

export interface BracketConnectionSeedTeam extends BracketConnectionSeedTeamId {
  isWinner: boolean;
}
export interface BracketConnectionRegularTeam
  extends BracketConnectionRegularTeamId {
  isWinner: boolean;
}

export interface BracketConnectionEmptyTeam
  extends BracketConnectionEmptyTeamId {
  isWinner: boolean;
}

export type BracketConnectionTeam =
  | BracketConnectionRegularTeam
  | BracketConnectionSeedTeam
  | BracketConnectionEmptyTeam;

export interface BracketConnection {
  winnerTo: string | null;
  loserTo: string | null;
  teams: BracketConnectionTeam[];
}

export interface BracketConnections {
  [gameId: string]: BracketConnection;
}
