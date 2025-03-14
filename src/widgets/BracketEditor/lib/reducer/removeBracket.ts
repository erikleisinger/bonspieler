import { BracketGame } from "@/entities/Bracket";
import { BracketEditorState } from "./bracketEditorReducer";
import { scheduleTournament } from "@/shared/utils/generate";

export function removeBracket(
  state: BracketEditorState,
  { bracketIndex }: { bracketIndex: number }
) {
  const bracketToRemove = state.brackets[bracketIndex];
  const newConnections = { ...state.connections };
  const newReadableIdIndex = { ...state.readableIdIndex };
  const newRows = { ...state.rows };

  if (!bracketToRemove) {
    console.warn("could not remove bracket: bracket does not exist");
    return state;
  }
  bracketToRemove
    .flat()
    .flat()
    .forEach((game: BracketGame) => {
      const gameConnections = state.connections[game.id];
      const { teams } = gameConnections;

      const loserTeams = teams.filter(
        ({ gameId, isWinner }) => !!gameId && !isWinner
      );

      if (loserTeams?.length) {
        loserTeams.forEach((team) => {
          if (!team?.gameId) return;
          newConnections[team.gameId].loserTo = null;
        });
      }

      const { loserTo } = gameConnections;
      if (loserTo) {
        const loserToTeams = [...newConnections[loserTo].teams].filter(
          ({ gameId }) => gameId !== game.id
        );
        newConnections[loserTo].teams = loserToTeams;
      }

      delete newConnections[game.id];
      delete newReadableIdIndex[game.id];
      delete newRows[game.id];
    });

  const newBrackets = [...state.brackets];
  newBrackets.splice(bracketIndex, 1);

  const { schedule } = scheduleTournament(newConnections, state.numSheets);

  return {
    ...state,
    brackets: newBrackets,
    connections: newConnections,
    schedule,
    readableIdIndex: newReadableIdIndex,
    rows: newRows,
  };
}
