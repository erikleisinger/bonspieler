import type { Nullable } from "@/types";
import type { BracketConnections } from "@/entities/Bracket";
import type { BracketEditorState } from "./bracketEditorReducer";
/**
 *
 * @param gameId gameId of the game that's winner connection is being removed
 *
 */
export function removeWinnerConnection(
  state: BracketEditorState,
  {
    gameId,
  }: {
    gameId: string;
  }
): BracketEditorState {
  const newConnections = { ...state.connections };
  const thisConnection = newConnections[gameId];
  const winnerTo = thisConnection.winnerTo;
  if (winnerTo) {
    thisConnection.winnerTo = null;

    newConnections[gameId] = thisConnection;

    const winnerConnection = newConnections[winnerTo];

    const { teams } = winnerConnection;
    const newTeams = [...teams];
    const teamIndex = teams.findIndex(
      ({ gameId: connectionGameId }: { gameId: Nullable<string> }) =>
        gameId === connectionGameId
    );
    if (teamIndex > -1) {
      newTeams.splice(teamIndex, 1, {
        ...teams[teamIndex],
        isWinner: false,
        gameId: null,
      });
      winnerConnection.teams = newTeams;
    }
    newConnections[winnerTo] = winnerConnection;
  }
  return {
    ...state,
    connections: newConnections,
  };
}
