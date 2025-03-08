import type { BracketEditorState } from "./bracketEditorReducer";

import { calculateAvailableGames } from "./calculateAvailableGames";
export function lookForWinnerConnection(
  state: BracketEditorState,
  {
    gameId,
    gameIndex,
    roundNumber,
    bracketNumber,
  }: {
    gameId: string;
    gameIndex: number;
    bracketNumber: number;
    roundNumber: number;
  }
): BracketEditorState {
  if (!gameId) {
    console.warn("gameId is required for lookForWinnerConnection action");
    return state;
  }

  if (typeof bracketNumber !== "number") {
    console.warn(
      "bracketNumber is required for lookForWinnerConnection action"
    );
    return state;
  }
  if (typeof roundNumber !== "number") {
    console.warn("roundNumber is required for lookForWinnerConnection action");
    return state;
  }
  if (typeof gameIndex !== "number") {
    console.warn("gameIndex is required for lookForWinnerConnection action");
    return state;
  }
  const availableGames = calculateAvailableGames({
    gameId,
    gameIndex,
    roundNumber,
    bracketNumber,
    connections: state.connections,
    brackets: state.brackets,
    rows: state.rows,
  });
  const newState = {
    ...state,
    lookingForWinnerConnection: {
      gameId,
      gameIndex,
      bracketNumber,
      roundNumber,
    },
    availableGames,
  };
  return newState;
}
