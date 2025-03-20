import { useEffect, useCallback } from "react";
import { calculateRowSpanForGame } from "../lib/calculateRowSpanForGame";
import type { BracketGame, BracketRowWithId, BracketRows } from "../types";
import GameConnections from "./GameConnections";
import { BRACKET_CONTAINER_ELEMENT_ID_PREFIX } from "../lib/constants/element-id";
import { BracketConnections } from "../types";

import type {
  WinnerConnections,
  OriginConnections,
} from "@/entities/Bracket/BracketGameConnections";

export interface BracketProps {
  bracketNumber: number;
  children?: React.ReactNode;
  connections: BracketConnections;
  rounds: BracketGame[][];
  rows: BracketRows;
  winnerConnections: WinnerConnections;
  originConnections: OriginConnections;
  setRows: (newRows: BracketRows) => void;
}

export default function Bracket({
  bracketNumber,
  children,
  connections,
  rounds,
  rows,
  winnerConnections,
  originConnections,
  setRows,
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
              connections,
              game,
              roundIndex,
              rowsIndex: gameRowSpanMap,
              rowsArray: all,
              winnerConnections,
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
        gamePositions[gamePositions.length - 1].rowEnd + 2 ** roundIndex;
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
  }, [JSON.stringify(connections), rounds]);

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
            connections={connections}
            winnerConnections={winnerConnections}
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
