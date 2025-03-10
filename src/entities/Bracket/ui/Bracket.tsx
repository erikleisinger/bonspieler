import { useEffect, useContext, useCallback } from "react";
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

  const calculateRows = useCallback(() => {
    const gameRowSpanMap: BracketRows = {};
    rounds.forEach((round, roundIndex) => {
      round
        .reduce((all: BracketRowWithId[], game: BracketGame) => {
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
        }, [])
        .forEach(({ id: gameId, ...rest }) => {
          gameRowSpanMap[gameId] = rest;
        });
    });
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
          />
        );
      })}
    </div>
  );
}
