import { BracketEditorState } from "../types/reducer-types";

export function lookToAssignTeam(
  state: BracketEditorState,
  {
    teamId,
  }: {
    teamId: string;
  }
): BracketEditorState {
  const { connections: newConnections } = state;
  const availableGames = Object.entries(newConnections)
    .filter(([_, connections]) => {
      const { teams = [] } = connections || {};
      return teams.some(({ teamId }) => teamId === "seed");
    })
    .map(([gameId]) => gameId);
  const newState = {
    ...state,
    connections: newConnections,
    lookingToAssignTeam: teamId,
    lookingForLoserConnection: null,
    availableGames,
  };
  return newState;
}
