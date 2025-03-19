import type { PayloadAction } from "@reduxjs/toolkit";
import { BracketEventState } from "../bracketEventSlice";
import { BracketConnectionTeam } from "@/entities/Bracket";
export function updateBracketGameTeam(
  state: BracketEventState,
  action: PayloadAction<{
    gameId: string;
    teamIndex: number;
    updates: Partial<BracketConnectionTeam>;
  }>
) {
  if (!state.bracket) return;
  const { gameId, teamIndex, updates } = action.payload;
  const game = state.bracket.connections[gameId];
  const { teams } = game.teams;
  const newTeams = [...teams];
  const newTeam = { ...newTeams[teamIndex], ...updates };

  newTeams.splice(teamIndex, 1, newTeam);
  state.bracket.connections[gameId].teams = newTeams;
}
