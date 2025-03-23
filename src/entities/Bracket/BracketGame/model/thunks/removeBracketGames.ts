import type { AppThunk } from "@/lib/store";
import {
  getBracketGames,
  setBracketGameIndex,
  setBracketGamesReadableIdIndex,
  setBracketGames,
  updateRemovedGameIds,
} from "../bracketGamesSlice";
import { generateReadableIdIndex, generateGameIndex } from "../helpers";
export const removeBracketGames =
  (bracketIndexToRemove: number): AppThunk =>
  (dispatch, getState) => {
    const bracketGames = getBracketGames(getState());
    const bracketToRemove = bracketGames[bracketIndexToRemove];
    const newBrackets = [...bracketGames];
    newBrackets.splice(bracketIndexToRemove, 1);
    const readableIdIndex = generateReadableIdIndex(newBrackets);
    const gameIndex = generateGameIndex(newBrackets);

    const removedGameIds = bracketToRemove.flat().map((game) => game.id);

    dispatch(setBracketGames(newBrackets));
    dispatch(setBracketGameIndex(gameIndex));
    dispatch(setBracketGamesReadableIdIndex(readableIdIndex));
    dispatch(updateRemovedGameIds(removedGameIds));
  };
