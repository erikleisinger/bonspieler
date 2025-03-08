import { useEffect, useContext, useCallback } from "react";
import BracketRound from "./BracketRound";
import { BracketContext } from "@/shared/Bracket/BracketContext";
import { calculateRowSpanForGame } from "../lib/calculateRowSpanForGame";
import type { BracketGame, BracketRowWithId, BracketRows } from "../lib";
import GameConnections from "./GameConnections";

export interface BracketProps {
  rounds: BracketGame[][];
  rows: BracketRows;
  setRows: (newRows: BracketRows) => void;
}

export default function Bracket({ rounds, rows, setRows }: BracketProps) {
  const { connections } = useContext(BracketContext);
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
    <div className="flex gap-24 relative">
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
          />
        );
      })}
    </div>
  );
}
