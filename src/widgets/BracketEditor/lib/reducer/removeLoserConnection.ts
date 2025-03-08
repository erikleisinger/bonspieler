import { BracketEditorState } from "./bracketEditorReducer";

export function removeLoserConnection(
  state: BracketEditorState,
  gameId: string
) {
  if (!gameId) {
    console.warn("gameId is required for removeLoserConnection action");
    return state;
  }

  const { connections } = state;
  const originConnection = connections[gameId];
  if (!originConnection) {
    console.warn(
      "originConnection is required for removeLoserConnection action"
    );
    return state;
  }

  if (!originConnection.loserTo) return state;
  const destinationConnection = connections[originConnection.loserTo];

  const newDestinationConnection = { ...destinationConnection };
  const newTeams = [...newDestinationConnection.teams];
  const loserTeamIndex = newTeams.findIndex(
    ({ gameId: loserGameId, isWinner }) => !isWinner && loserGameId === gameId
  );
  if (loserTeamIndex === -1) {
    console.warn("cannot remove loser destination from game: does not exist");
    return state;
  }
  newTeams.splice(loserTeamIndex, 1, {
    gameId: null,
    teamId: null,
    isWinner: false,
  });
  newDestinationConnection.teams = newTeams;

  const newOriginConnection = {
    ...originConnection,
    loserTo: null,
  };

  const newConnections = {
    ...connections,
    [gameId]: newOriginConnection,
    [originConnection.loserTo]: newDestinationConnection,
  };
  const newState = {
    ...state,
    connections: newConnections,
  };
  return newState;
}
