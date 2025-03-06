export interface BracketConnectionSeedTeamId {
  teamId: string;
  gameId: null;
}

export interface BracketConnectionRegularTeamId {
  gameId: string;
  teamId: null;
}

export interface BracketConnectionSeedTeam extends BracketConnectionSeedTeamId {
  isWinner: boolean;
}
export interface BracketConnectionRegularTeam
  extends BracketConnectionRegularTeamId {
  isWinner: boolean;
}

export interface BracketConnection {
  winnerTo: string | null;
  loserTo: string | null;
  teams: (BracketConnectionRegularTeam | BracketConnectionRegularTeam)[];
}
