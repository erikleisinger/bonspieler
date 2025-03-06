import { useEffect, useState } from "react";
import type { BracketGame } from "../lib/types/BracketGame";
import BracketRound from "./BracketRound";
import type { BracketConnection, BracketConnectionRegularTeam } from "../lib";
import GameConnections from "./GameConnections";

export interface BracketProps {
  bracketNumber: number;
  rounds: BracketGame[][];
  connections: { [gameId: string]: BracketConnection };
}

export default function Bracket({
  bracketNumber,
  rounds,
  connections,
}: BracketProps) {
  const [rows, setRows] = useState({});

  useEffect(() => {
    calculateRows();
  }, [connections, rounds]);

  function calculateRows() {
    const gameRowSpanMap: { [gameId: string]: number } = {};
    rounds.forEach((round) => {
      round.forEach((game: BracketGame) => {
        const gameConnections: BracketConnection = connections[game.id];
        const winnerConnections = gameConnections.teams.filter(
          ({ gameId, isWinner }) => !!gameId && isWinner
        );

        let baseWinnerConnections = 0;
        if (!winnerConnections.length) {
          baseWinnerConnections = 1;
        } else {
          winnerConnections.forEach(
            (winnerConnection: BracketConnectionRegularTeam) => {
              const runningConnections =
                gameRowSpanMap[winnerConnection.gameId];
              if (runningConnections) {
                baseWinnerConnections += runningConnections;
              }
            }
          );
        }

        gameRowSpanMap[game.id] = baseWinnerConnections;
      });
    });

    setRows({ ...gameRowSpanMap });
  }
  return (
    <div className="flex gap-32 relative">
      {rounds.map((games, roundIndex) => {
        return (
          <BracketRound
            games={games}
            connections={connections}
            key={"round-" + roundIndex}
            rows={rows}
          />
        );
      })}
      <GameConnections connections={connections} games={rounds.flat()} />
    </div>
  );
}
