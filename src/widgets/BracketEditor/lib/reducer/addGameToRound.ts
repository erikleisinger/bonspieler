import type { BracketEditorState } from "./bracketEditorReducer";
import { DEFAULT_GAME, DEFAULT_CONNECTION } from "../defaults";
import { scheduleTournament } from "@erikleisinger/bracket-generator";
import { generateUUID } from "@/shared/utils/generateUUID";
import { generateReadableIdIndex } from "../generateReadableIdIndex";
export function addGameToRound(
  state: BracketEditorState,
  {
    bracketNumber,
    roundNumber,
  }: {
    bracketNumber: number;
    roundNumber: number;
  }
) {
  const newBrackets = [...state.brackets];
  const newBracket = [...newBrackets[bracketNumber]];
  const newRound = [...newBracket[roundNumber]];
  const newGame = {
    ...JSON.parse(JSON.stringify(DEFAULT_GAME)),
    bracketNumber,
    roundNumber,
    id: generateUUID(),
  };
  newRound.push(newGame);
  newBracket[roundNumber] = newRound;
  newBrackets[bracketNumber] = newBracket;

  const newConnections = {
    ...state.connections,
    [newGame.id]: {
      ...JSON.parse(JSON.stringify(DEFAULT_CONNECTION)),

      id: newGame.id,
    },
  };
  const { schedule } = scheduleTournament(newConnections, 8);
  const newState = {
    ...state,
    brackets: newBrackets,
    connections: newConnections,
    readableIdIndex: generateReadableIdIndex(newBrackets),
    schedule,
  };
  return {
    state: newState,
    newGame,
  };
}
