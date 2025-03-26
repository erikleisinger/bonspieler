import type { AppThunk } from "@/lib/store";
import { RootState } from "@/lib/store";
import {
  getBracketGames,
  getBracketGamesReadableIdIndex,
  setBracketGamesReadableIdIndex,
  setBracketGames,
} from "../bracketGamesSlice";
import { BracketGameType } from "@/entities/Bracket";
import { generateReadableId } from "../helpers/generateReadableId";

/**
 *
 * @param increment can be positive or negative
 * @param bracketsAfter the index of the bracket after which the shift should start. i.e. '3' will shift brackets 4 and up
 * @returns
 */

export const shiftBracketAssignmentForGames =
  ({
    increment,
    bracketsAfter,
  }: {
    increment: number;
    bracketsAfter: number;
  }): AppThunk =>
  (dispatch, getState) => {
    const state: RootState = getState();
    const bracketGames: BracketGameType[][][] = [...getBracketGames(state)];
    const readableIdIndex = { ...getBracketGamesReadableIdIndex(state) };

    let newBrackets = [...bracketGames];
    const newReadableIndex = { ...readableIdIndex };

    newBrackets = newBrackets.map((bracket, bracketIndex) => {
      return bracket.map((round) => {
        return round.map((game, gameIndex) => {
          if (bracketIndex <= bracketsAfter) {
            return game;
          }
          let newBracketNumber = game.bracketNumber + increment;
          if (game.bracketNumber + increment < 0) {
            newBracketNumber = 0;
          }
          const newGame = {
            ...game,
            bracketNumber: newBracketNumber,
          };

          const newReadableId = generateReadableId(newGame, gameIndex);
          newReadableIndex[game.id] = newReadableId;

          return newGame;
        });
      });
    });

    dispatch(setBracketGames(newBrackets));
    dispatch(setBracketGamesReadableIdIndex(newReadableIndex));
  };
