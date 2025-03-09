import { BracketEditorState } from "./bracketEditorReducer";

export function toggleSeed(
  state: BracketEditorState,
  {
    gameId,
    index,
    teamId,
  }: {
    gameId: string;
    index: number;
    teamId: string;
  }
) {
  const { connections } = state;
  const newConnections = { ...connections };
  const theseConnections = newConnections[gameId] || {};
  const { teams: theseTeams } = theseConnections;
  const newTeams = [...theseTeams];
  const team = newTeams[index];
  const newTeam = { ...team, teamId };
  newTeams[index] = newTeam;
  newConnections[gameId] = {
    ...theseConnections,
    teams: newTeams,
  };
  return {
    ...state,
    connections: newConnections,
  };
}
