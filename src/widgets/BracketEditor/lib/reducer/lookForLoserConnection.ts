import type { BracketEditorState } from "./bracketEditorReducer";
import { removeLoserConnection } from "./removeLoserConnection";
function isUnavailableToBeLoser(
  gameId: string,
  connections: BracketEditorState["connections"]
): boolean {
  const connection = connections[gameId];
  if (!connection) {
    return true;
  }
  const { teams = [] } = connection;
  if (!teams.length) return true;
  const loserConnections = teams.filter(
    ({ gameId, teamId }) => !!gameId || !!teamId
  );
  return loserConnections.length >= 2;
}

export function lookForLoserConnection(
  state: BracketEditorState,
  {
    gameId,
    bracketNumber,
  }: {
    gameId: string;
    bracketNumber: number;
  }
): BracketEditorState {
  if (!gameId) {
    console.warn("gameId is required for lookForLoserConnection action");
    return state;
  }

  const { connections: newConnections } = removeLoserConnection(state, gameId);
  const availableGames: string[] = [];
  state.brackets.forEach((bracket, bracketIndex) => {
    if (bracketIndex <= bracketNumber) return;
    bracket.forEach((round) => {
      round.forEach((game) => {
        if (game.id === gameId) return;
        if (isUnavailableToBeLoser(game.id, newConnections)) return;
        availableGames.push(game.id);
      });
    });
  });

  const newState = {
    ...state,
    connections: newConnections,
    lookingForLoserConnection: gameId,
    availableGames,
  };
  return newState;
}
