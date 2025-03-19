import { PayloadAction } from "@reduxjs/toolkit";
import type { BracketEventState } from "../bracketEventSlice";

export const assignTeamToGame = (
  state: BracketEventState,
  action: PayloadAction<{
    gameId: string;
    teamId: string;
  }>
) => {
  if (!state.bracket) return;
  const { gameId, teamId } = action.payload;
  const newConnections = { ...(state.bracket?.connections || {}) };
  const game = newConnections[gameId];
  const teams = [...game.teams];
  const teamIndex = teams.findIndex((team) => team.teamId === "seed");
  if (teamIndex < 0) return;
  teams.splice(teamIndex, 1, {
    ...teams[teamIndex],
    teamId,
  });
  newConnections[gameId].teams = teams;
  state.bracket.connections = newConnections;
  state.bracket.lookingToAssignTeam = null;
};
