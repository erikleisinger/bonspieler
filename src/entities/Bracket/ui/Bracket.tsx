import { useEffect, useState } from "react";
import BracketRound from "./BracketRound";
import type {
  BracketConnections,
  BracketGame,
  BracketRow,
  BracketConnectionRegularTeam,
} from "../lib";
import GameConnections from "./GameConnections";

export interface BracketProps {
  bracketNumber: number;
  rounds: BracketGame[][];
  connections: BracketConnections;
}

export default function Bracket({ rounds, connections }: BracketProps) {
  const [rows, setRows] = useState({});

  const [baseNumRows, setBaseNumRows] = useState(0);

  useEffect(() => {
    calculateRows();
  }, [connections, rounds]);

  function calculateRows() {
    let gameRowSpanMap: {
      [gameId: string]: {
        rowStart: number;
        rowEnd: number;
      };
    } = {};

    rounds.forEach((round, roundIndex) => {
      round
        .reduce((all: ({ id: string } & BracketRow)[], game: BracketGame) => {
          /**
           * Find all games in previous round that are connected to this game
           * I.e. the winners of those games advance to the game being placed.
           */
          const gameConnections = (connections[game.id]?.teams || []).filter(
            ({ gameId, isWinner }) => !!gameId && isWinner
          ) as BracketConnectionRegularTeam[];

          let rowStart = 1;
          let rowEnd = 2;

          if (!gameConnections.length) {
            // When a game has no origins, then we don't need to place a game vertically between its origin games.
            // We can just place it below the the current lowest game in the same round.

            const lastGame = all[all.length - 1];
            const { rowEnd: lastGameRowEnd = 1 } = lastGame || {};

            /**
             * Here 1 * roundIndex is to account for the fact that
             * the height of rows decreases as the round number increases.
             */

            rowStart = lastGameRowEnd + roundIndex + 1 * roundIndex;
            rowEnd = lastGameRowEnd + roundIndex + 1 + 1 * roundIndex;
          } else {
            const upperOriginGame = gameConnections[0];
            const lowerOriginGame = gameConnections[1] || gameConnections[0];

            const upperOrigin = gameRowSpanMap[upperOriginGame.gameId];
            const lowerOrigin = gameRowSpanMap[lowerOriginGame.gameId];

            rowEnd = lowerOrigin.rowEnd * 2 - 1;
            rowStart = upperOrigin.rowStart * 2 - 1;

            /**
             * In instances where the the vertical position of the game cannot
             * be calculated by simply taking the middle of the two origin games,
             * i.e. when the row-span of the origin games is not the same,
             * find the vertical difference between those origin games and use it to offset
             * the row span of the game being place.
             */

            const upperOriginDiff = upperOrigin.rowEnd - upperOrigin.rowStart;
            const lowerOriginDiff = lowerOrigin.rowEnd - lowerOrigin.rowStart;
            const verticalDiff = upperOriginDiff - lowerOriginDiff;

            if (verticalDiff > 0) {
              rowStart += verticalDiff;
            } else if (verticalDiff < 0) {
              rowEnd -= verticalDiff;
            }
          }

          if (rowEnd > baseNumRows) {
            setBaseNumRows(rowEnd);
          }
          return [
            ...all,
            {
              id: game.id,
              rowStart,
              rowEnd,
            },
          ];
        }, [])
        .forEach(({ id: gameId, ...rest }) => {
          gameRowSpanMap[gameId] = rest;
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
            roundIndex={roundIndex}
          />
        );
      })}
      <GameConnections
        connections={connections}
        games={rounds.flat()}
        rows={rows}
      />
    </div>
  );
}
