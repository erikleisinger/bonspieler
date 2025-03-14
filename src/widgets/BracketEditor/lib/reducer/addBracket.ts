import { BracketEditorState } from "./bracketEditorReducer";
import {
  generateTournament,
  scheduleTournament,
} from "@/shared/utils/generate";
import { generateReadableIdIndex } from "../generateReadableIdIndex";
export function addBracket(
  state: BracketEditorState,
  {
    numTeams,
    numWinners,
    isSeeded = false,
  }: {
    numTeams: number;
    numWinners: number;
    isSeeded: boolean;
  }
) {
  const { brackets, connections } = generateTournament(numTeams, [numWinners]);

  const [newBracket] = brackets;
  const newBracketWithCorrectBracketNumbers = newBracket.map((round) => {
    return round.map((g) => ({
      ...g,
      bracketNumber: state.brackets.length,
      isSeed: isSeeded,
    }));
  });

  const newBracketConnectionsWithSeeds = { ...connections };
  if (!isSeeded) {
    Object.entries(newBracketConnectionsWithSeeds).forEach(
      ([gameId, entry]) => {
        const teams = entry.teams.map((t) => ({
          ...t,
          teamId: t.teamId === "seed" ? null : t.teamId,
        }));
        newBracketConnectionsWithSeeds[gameId].teams = teams;
      }
    );
  }

  const newConnections = {
    ...state.connections,
    ...newBracketConnectionsWithSeeds,
  };

  const newBrackets = [...state.brackets, newBracketWithCorrectBracketNumbers];
  const { schedule } = scheduleTournament(newConnections, state.numSheets);

  return {
    ...state,
    connections: newConnections,
    brackets: newBrackets,
    schedule,
    readableIdIndex: generateReadableIdIndex(newBrackets),
  };
}
