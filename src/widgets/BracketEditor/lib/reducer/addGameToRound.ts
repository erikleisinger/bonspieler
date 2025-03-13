import type { BracketEditorState } from "./bracketEditorReducer";
import { DEFAULT_GAME, DEFAULT_CONNECTION } from "../defaults";
import { scheduleTournament } from "@erikleisinger/bracket-generator";
import { generateUUID } from "@/shared/utils/generateUUID";
import { generateReadableIdIndex } from "../generateReadableIdIndex";
import type { BracketGame, BracketRows } from "@/entities/Bracket";
import { getEmptyRoundSlots } from "../getEmptyRoundSlots";

function getFirstAvailableSlot({
  bracketNumber,
  roundNumber,
  brackets,
  rows,
}: {
  bracketNumber: number;
  roundNumber: number;
  brackets: BracketGame[][][];
  rows: BracketRows;
}) {
  const available = getEmptyRoundSlots({
    bracketNumber,
    roundNumber,
    brackets,
    rows,
  });

  if (!available?.length) {
    return brackets[bracketNumber][roundNumber].length;
  }
  return available[0];
}

export function addGameToRound(
  state: BracketEditorState,
  {
    bracketNumber,
    roundNumber,
    gameIndex,
    offset = 0,
  }: {
    bracketNumber: number;
    roundNumber: number;
    gameIndex: number;
    offset?: number;
  }
) {
  const newBrackets = [...state.brackets];
  const newBracket = [...newBrackets[bracketNumber]];
  const newRound = [...newBracket[roundNumber]];
  const newGame = {
    ...JSON.parse(JSON.stringify(DEFAULT_GAME)),
    bracketNumber,
    roundNumber,
    offset,
    id: generateUUID(),
  };

  if (gameIndex !== undefined) {
    newRound.splice(gameIndex, 0, newGame);
  } else {
    const firstAvailableSpot = getFirstAvailableSlot({
      bracketNumber,
      roundNumber,
      brackets: newBrackets,
      rows: state.rows,
    });
    newRound.splice(firstAvailableSpot, 0, newGame);
  }

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
