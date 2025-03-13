import { useEffect, useContext, useCallback, useState } from "react";
import BracketRound from "./BracketRound";
import { BracketContext } from "@/shared/Bracket/BracketContext";
import { BracketEditingContext } from "@/shared/EditableBracket/BracketEditingContext";
import { calculateRowSpanForGame } from "../lib/calculateRowSpanForGame";
import type { BracketGame, BracketRowWithId, BracketRows } from "../lib";
import GameConnections from "./GameConnections";

export interface BracketProps {
  bracketNumber: number;
  rounds: BracketGame[][];
  rows: BracketRows;
  setRows: (newRows: BracketRows) => void;
}

export default function Bracket({
  bracketNumber,
  rounds,
  rows,
  setRows,
}: BracketProps) {
  const { connections, deselectGame } = useContext(BracketContext);
  const { deselectAll } = useContext(BracketEditingContext);
  function deselect(e) {
    deselectGame(e);
    deselectAll();
  }

  const connectionsString = JSON.stringify(connections);

  const [emptySlots, setEmptySlots] = useState<
    { rowStart: number; rowEnd: number }[][]
  >([]);

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

    const empties = roundSlotMap.map((round, roundIndex) => {
      const factor = 2 ** roundIndex;
      let successiveEmptySlot = 0;
      let successiveGameSlot = 0;
      let runningIndex = 0;
      const emptySlotsArray: { rowStart: number; rowEnd: number }[] = [];
      round.forEach((slot: "game" | null, index) => {
        if (slot === "game") {
          successiveEmptySlot = 0;
          successiveGameSlot += 1;
        } else {
          successiveEmptySlot += 1;
          successiveGameSlot = 0;
        }
        if (successiveGameSlot === factor) {
          runningIndex += 1;
          successiveGameSlot = 0;
        }

        if (successiveEmptySlot === factor) {
          emptySlotsArray.push({
            rowStart: index + 2 - factor,
            rowEnd: index + 2,
            index: runningIndex,
            offset: emptySlotsArray.filter(({ index: i }) => i === runningIndex)
              .length,
          });
        }
      });
      return emptySlotsArray;
    });

    setEmptySlots(empties);
    setRows({ ...gameRowSpanMap });
  }, [connectionsString, rounds]);

  useEffect(() => {
    calculateRows();
  }, [calculateRows]);

  return (
    <div className="flex  relative">
      <div
        className="absolute inset-0 "
        onClick={(e) => deselect(e.nativeEvent)}
      ></div>
      <GameConnections
        connections={connections}
        games={rounds.flat()}
        rows={rows}
      />
      {rounds.map((games, roundIndex) => {
        return (
          <BracketRound
            games={games}
            key={"round-" + roundIndex}
            rows={rows}
            roundIndex={roundIndex}
            bracketNumber={bracketNumber}
            emptySlots={emptySlots[roundIndex]}
          />
        );
      })}
    </div>
  );
}
