import GameConnection from "./GameConnection";
import type { BracketConnection } from "../lib";
import type { BracketGame } from "../lib/types/BracketGame";
import type { GameConnectionPositionInfo } from "../lib/types/GameConnection";
import { useState, useEffect, useRef } from "react";
export default function GameConnections({
  games,
  connections,
}: {
  games: BracketGame[];
  connections: { [gameId: string]: BracketConnection };
}) {
  const [connectionPositions, setConnectionPositions] = useState<{
    [gameId: string]: GameConnectionPositionInfo;
  }>({});

  const MARGIN = 16;

  function calculateConnectionPositions() {
    const positions: { [gameId: string]: GameConnectionPositionInfo } = {};
    const { top: containerTop, left: containerLeft } =
      container.current.getBoundingClientRect();
    games.forEach((game, gameIndex) => {
      const { teams = [] } = connections[game.id] || {};
      const connectedGames = teams.filter(
        ({ gameId, isWinner }) => !!gameId && !!isWinner
      );
      if (!connectedGames?.length) return;

      const verticalPositions = connectedGames.map((game) => {
        const gameEl = document.getElementById("game-" + game.gameId);
        const { top, height } = gameEl?.getBoundingClientRect();
        return top + height / 2;
      });

      const top = Math.min(...verticalPositions);
      const bottom = Math.max(...verticalPositions);

      const oneEl = document.getElementById("game-" + connectedGames[0].gameId);
      const {
        left: originLeft,
        width: originWidth,
        height: originHeight,
        top: originTop,
      } = oneEl.getBoundingClientRect();

      const height = bottom - top || originHeight - MARGIN * 2;

      const posLeft = originLeft + originWidth - containerLeft;
      const posTop =
        connectedGames.length === 1
          ? originTop - containerTop + MARGIN
          : top - containerTop;

      const thisEl = document.getElementById("game-" + game.id);
      const { left: thisLeft } = thisEl.getBoundingClientRect();

      const posWidth = thisLeft - (originLeft + originWidth);

      positions[game.id] = {
        position: {
          x: posLeft,
          y: posTop,
        },
        dimensions: {
          height,
          width: posWidth,
        },
      };
    });
    setConnectionPositions(positions);
  }

  useEffect(() => {
    calculateConnectionPositions();
  }, [games, connections]);

  const container = useRef(null);

  return (
    <div ref={container} className="absolute inset-0 pointer-events-none z-10">
      {games.map(({ id: gameId }) => {
        return (
          <GameConnection
            key={gameId}
            gameId={gameId}
            positionInfo={connectionPositions[gameId]}
          ></GameConnection>
        );
      })}
    </div>
  );
}
