import type { BracketConnections } from "@/entities/Bracket";
/**
 *
 * @param gameId gameId of the game that's winner connection is being removed
 * @param {BracketConnections} allConnections all connections for the event
 */
export function removeWinnerConnection(
  gameId: string,
  allConnections: BracketConnections
): BracketConnections {
  const newConnections = { ...allConnections };
  const thisConnection = newConnections[gameId];
  const winnerTo = thisConnection.winnerTo;
  if (!winnerTo) return allConnections;
  thisConnection.winnerTo = null;

  newConnections[gameId] = thisConnection;

  const winnerConnection = newConnections[winnerTo];

  const { teams } = winnerConnection;
  const newTeams = [...teams];
  const teamIndex = teams.findIndex(
    ({ gameId: connectionGameId }: { gameId: string | null }) =>
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

  return newConnections;
}
