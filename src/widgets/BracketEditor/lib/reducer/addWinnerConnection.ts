import { BracketEditorState } from "./bracketEditorReducer";

export function addWinnerConnection(
  state: BracketEditorState,
  {
    originGameId,
    destinationGameId,
  }: {
    originGameId: string;
    destinationGameId: string;
  }
) {
  if (!originGameId) {
    console.warn("originGameId is required for addWinnerConnection action");
    return state;
  }
  if (!destinationGameId) {
    console.warn(
      "destinationGameId is required for addWinnerConnection action"
    );
    return state;
  }
  const { connections } = state;
  const originConnection = connections[originGameId];
  const destinationConnection = connections[destinationGameId];
  if (!originConnection) {
    console.warn("originConnection is required for addWinnerConnection action");
    return state;
  }
  if (!destinationConnection) {
    console.warn(
      "destinationConnection is required for addWinnerConnection action"
    );
    return state;
  }

  const newDestinationConnection = { ...destinationConnection };
  const newTeams = [...newDestinationConnection.teams];
  const availableTeamIndex = newTeams.findIndex(
    ({ gameId, teamId }) => !gameId && !teamId
  );
  if (availableTeamIndex === -1) {
    console.warn(
      "destination game does not have an available team slot for addWinnerConnection action"
    );
    return state;
  }
  newTeams.splice(availableTeamIndex, 1, {
    gameId: originGameId,
    teamId: null,
    isWinner: true,
  });
  newDestinationConnection.teams = newTeams;

  const newOriginConnection = {
    ...originConnection,
    winnerTo: destinationGameId,
  };

  const newConnections = {
    ...connections,
    [originGameId]: newOriginConnection,
    [destinationGameId]: newDestinationConnection,
  };
  const newState = {
    ...state,
    connections: newConnections,
  };
  return newState;
}
