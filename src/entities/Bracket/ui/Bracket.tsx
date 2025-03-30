import { useEffect, useCallback } from "react";
import { calculateRowSpanForGame } from "../lib/calculateRowSpanForGame";
import type { BracketGame, BracketRowWithId, BracketRows } from "../types";
import GameConnections from "./GameConnections";
import { BRACKET_CONTAINER_ELEMENT_ID_PREFIX } from "../lib/constants/element-id";

import type { OriginConnections } from "@/entities/Bracket/BracketGameConnections";

export interface BracketProps {
  bracketNumber: number;
  children?: React.ReactNode;
  rounds: BracketGame[][];
  rows: BracketRows;
  originConnections: OriginConnections;
  setRows: (newRows: BracketRows) => void;
  stageId: string;
}

export default function Bracket({
  bracketNumber,
  children,
  rounds,
  rows,
  originConnections,
  setRows,
  stageId,
}: BracketProps) {
  const calculateRows = useCallback(() => {
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
              stageId,
            }),
          ];
        },
        []
      );

      gamePositions.forEach(({ id: gameId, ...rest }) => {
        gameRowSpanMap[gameId] = rest;
      });
      const largestValue =
        (gamePositions[gamePositions.length - 1]?.rowEnd || 0) +
        2 ** roundIndex;
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

    setRows({ ...gameRowSpanMap });
  }, [JSON.stringify(originConnections), rounds]);

  useEffect(() => {
    calculateRows();
  }, [calculateRows]);

  return (
    <div className="w-fit">
      <div
        className="p-0 min-h-screen pr-[100vw] md:pr-[500px]"
        id={BRACKET_CONTAINER_ELEMENT_ID_PREFIX + bracketNumber}
      >
        <div className="flex  relative">
          <GameConnections
            originConnections={originConnections}
            games={rounds.flat()}
            rows={rows}
          />
          {children}
        </div>
      </div>
    </div>
  );
}
