import GameConnection from "./GameConnection";
import type { BracketGame, BracketRows } from "../types";
import type { GameConnectionPositionInfo } from "../types/GameConnection";
import { useState, useEffect, useRef, useCallback } from "react";
import { getBracketGameElement } from "../lib/getBracketGameElement";
import type { OriginConnections } from "@/entities/BracketGameConnections";
export default function GameConnections({
  games,
  rows,
  originConnections,
  scale,
}: {
  games: BracketGame[];
  rows: BracketRows;
  originConnections: OriginConnections;
  scale;
}) {
  const [connectionPositions, setConnectionPositions] = useState<{
    [gameId: string]: GameConnectionPositionInfo;
  }>({});

  const MARGIN = 8;

  const calculateConnectionPositions = useCallback(() => {
    const positions: { [gameId: string]: GameConnectionPositionInfo } = {};
    const { top: containerTop, left: containerLeft } =
      container.current.getBoundingClientRect();

    games.forEach((game) => {
      const teams = (originConnections[game.id] || []).filter(
        ({ stageId: thisStageId }) => !thisStageId
      );
      const connectedGames = teams.filter(
        ({ gameId, isWinner }) => !!gameId && !!isWinner
      );
      if (!connectedGames?.length) return;

      const verticalPositions = connectedGames.map((game) => {
        const gameEl = getBracketGameElement(game.gameId);
        if (!gameEl) return 0;

        const { top, height } = gameEl?.getBoundingClientRect();
        return top + height / 2;
      });

      const top = Math.min(...verticalPositions);
      const bottom = Math.max(...verticalPositions);

      const oneEl = getBracketGameElement(connectedGames[0].gameId);

      if (!oneEl) return;

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

      const thisEl = getBracketGameElement(game.id);
      if (!thisEl) return;

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
  }, [games, JSON.stringify(originConnections), rows, scale]);

  useEffect(() => {
    calculateConnectionPositions();
  }, [calculateConnectionPositions]);

  const container = useRef(null);

  return (
    <div ref={container} className="absolute inset-0 pointer-events-none z-10">
      {games.map(({ id: gameId }) => {
        return (
          <GameConnection
            key={gameId}
            gameId={gameId}
            positionInfo={connectionPositions[gameId]}
            scale={scale}
          ></GameConnection>
        );
      })}
    </div>
  );
}
