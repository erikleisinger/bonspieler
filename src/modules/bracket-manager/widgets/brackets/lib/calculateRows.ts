import {
  OriginConnections,
  BracketGame,
} from "@/modules/bracket-manager/shared/types";
import { calculateRowSpanForGame } from "./calculateRowSpanForGame";
import type { BracketRowWithId, BracketRows } from "../types";

export function calculateRows({
  originConnections,
  rounds,
}: {
  originConnections: OriginConnections;
  rounds: BracketGame[][];
}) {
  const gameRowSpanMap: BracketRows = {};
  const roundSlotMap: ("game" | null)[][] = [];
  const roundGames = [];

  let largestRoundLength = 0;

  rounds.forEach((round, roundIndex) => {
    const gamePositions = round.reduce(
      (all: BracketRowWithId[], game: BracketGame) => {
        return [
          ...all,
          calculateRowSpanForGame({
            game,
            roundIndex,
            rowsIndex: gameRowSpanMap,
            rowsArray: all,
            originConnections,
          }),
        ];
      },
      []
    );

    gamePositions.forEach(({ id: gameId, ...rest }) => {
      gameRowSpanMap[gameId] = rest;
    });
    const largestValue =
      (gamePositions[gamePositions.length - 1]?.rowEnd || 0) + 2 ** roundIndex;
    const gameRowSpanArray: ("game" | null)[] = new Array(largestValue).fill(
      null
    );

    gamePositions.forEach(({ rowStart, rowEnd }) => {
      for (let i = rowStart - 1; i < rowEnd - 1; i++) {
        gameRowSpanArray[i] = "game";
      }
    });

    roundSlotMap[roundIndex] = gameRowSpanArray;
    roundGames[roundIndex] = gamePositions;

    if (largestRoundLength < gamePositions.length) {
      largestRoundLength = gamePositions.length;
    }
  });

  return gameRowSpanMap;
}
