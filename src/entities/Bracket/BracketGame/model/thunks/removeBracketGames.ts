import type { AppThunk } from "@/lib/store";
import {
  getBracketGames,
  setBracketGameIndex,
  setBracketGames,
  updateRemovedGameIds,
} from "../bracketGamesSlice";
import { generateGameIndex } from "../helpers";
export const removeBracketGames =
  (bracketIndexToRemove: number): AppThunk =>
  (dispatch, getState) => {
    const bracketGames = getBracketGames(getState());
    const bracketToRemove = bracketGames[bracketIndexToRemove];
    const newBrackets = [...bracketGames];
    newBrackets.splice(bracketIndexToRemove, 1);
    const gameIndex = generateGameIndex(newBrackets);

    const removedGameIds = bracketToRemove.flat().map((game) => game.id);

    dispatch(setBracketGames(newBrackets));
    dispatch(setBracketGameIndex(gameIndex));
    dispatch(updateRemovedGameIds(removedGameIds));
  };
