import { BracketEditorState } from "./bracketEditorReducer";
import { scheduleTournament } from "@/shared/utils/generate";
import { generateReadableIdIndex } from "../generateReadableIdIndex";
export function removeGameFromRound(
  state: BracketEditorState,
  {
    gameId,
    roundNumber,
    bracketNumber,
  }: {
    gameId: string;
    roundNumber: number;
    bracketNumber: number;
  }
) {
  const newState = { ...state };
  const newBrackets = [...newState.brackets];
  const bracket = newBrackets[bracketNumber];
  const round = bracket[roundNumber];
  const gameIndex = round.findIndex((game) => game.id === gameId);
  if (gameIndex > -1) round.splice(gameIndex, 1);
  newState.brackets = newBrackets;

  const newConnections = { ...newState.connections };
  const deletedGameConnections = newConnections[gameId];

  const { winnerTo, loserTo } = deletedGameConnections;
  if (winnerTo) {
    const winnerToConnections = newConnections[winnerTo];
    const index = winnerToConnections.teams.findIndex(
      ({ gameId: gid }) => gid === gameId
    );
    if (index !== -1) {
      winnerToConnections.teams[index] = {
        ...winnerToConnections.teams[index],
        gameId: null,
      };
      newConnections[winnerTo] = winnerToConnections;
    }
  }
  if (loserTo) {
    const loserToConnections = newConnections[loserTo];
    const index = loserToConnections.teams.findIndex(
      ({ gameId: gid }) => gid === gameId
    );
    if (index !== -1) {
      loserToConnections.teams[index] = {
        ...loserToConnections.teams[index],
        gameId: null,
      };
      newConnections[loserTo] = loserToConnections;
    }
  }

  const { teams } = deletedGameConnections;
  teams.forEach(({ gameId: thisGameId, isWinner }) => {
    if (!thisGameId) return;
    const connection = newConnections[thisGameId];
    if (isWinner) {
      connection.winnerTo = null;
    } else {
      connection.loserTo = null;
    }
    newConnections[thisGameId] = connection;
  });
  delete newConnections[gameId];
  newState.connections = newConnections;

  const { schedule } = scheduleTournament(newConnections, 8);
  newState.schedule = schedule;
  newState.readableIdIndex = generateReadableIdIndex(newState.brackets);
  return newState;
}
