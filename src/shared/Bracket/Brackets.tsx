"use client";
import { useEffect, useRef, useState, useContext } from "react";
import type { BracketRows, BracketGameType } from "@/entities/Bracket";
import {
  Bracket,
  BracketRound,
  BracketGame,
  BracketRow,
} from "@/entities/Bracket";

import { DestinationConnection } from "@/entities/Bracket/BracketGameConnections";

import BracketGameFinalResult from "@/entities/Bracket/BracketGame/ui/BracketGameFinalResult";
import { Nullable } from "@/shared/types";

import { BracketContext } from "./BracketContext";
import { Button } from "../ui/button";

export default function Brackets({
  availableGameIds = [],
  backgroundGameIds,
  gameResultChildren,
  onBackgroundClick,
  onGameClick,
  onGameResultClick = () => {},
  selectedGameIds = [],
  tournamentId,
  initialScale = 1,
}: {
  availableGameIds: string[];
  backgroundGameIds?: Nullable<string[]>;
  gameResultChildren?: React.ReactNode;
  onBackgroundClick?: () => void;
  onGameClick: (game: BracketGameType) => void;
  onGameResultClick: (game: BracketGameType) => void;
  selectedGameIds: string[];
  tournamentId: string;
  initialScale: number;
}) {
  const {
    originConnections,
    winnerConnections,
    loserConnections,
    brackets,
    schedule,
    stageId,
  } = useContext(BracketContext);

  function getRowSpanForGame(rows: BracketRow) {
    const { rowStart = 1, rowEnd = 2 } = rows || {};
    return {
      gridRow: `${rowStart} / ${rowEnd}`,
    };
  }

  const [rows, setRows] = useState<BracketRows>({});

  function updateRows(rows: BracketRows) {
    setRows((prev) => ({
      ...prev,
      ...rows,
    }));
  }

  const el = useRef(null);
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (!onBackgroundClick) return;
      const paths = e
        .composedPath()
        .map((el) => Array.from(el?.classList || []))
        .flat();
      if (
        paths.includes("BRACKET_GAME") ||
        paths.includes("BRACKET_GAME_FINAL_RESULT")
      )
        return;
      onBackgroundClick();
    }

    if (onBackgroundClick && el?.current)
      el.current.addEventListener("click", onClick);

    return () => {
      if (el?.current) el.current.removeEventListener("click", onClick);
    };
  }, [el, onBackgroundClick]);

  function isFinalResult(winnerConnection: DestinationConnection) {
    const { gameId: winnerGameId, stageId: winnerStageId } =
      winnerConnection || {};
    return !winnerGameId || (!!winnerStageId && winnerStageId !== stageId);
  }

  const [scale, setScale] = useState(initialScale);

  const MIN_SCALE = 0.6;
  const MAX_SCALE = 1.4;

  const updateScale = (value: number) => () => {
    setScale((prev) => {
      const newValue = prev + value;
      if (newValue < MIN_SCALE) return MIN_SCALE;
      if (newValue > MAX_SCALE) return MAX_SCALE;
      return Math.min(Math.max(newValue, 0.1), 2);
    });
  };

  return (
    <>
      <div ref={el} className="pointer-events-auto relative">
        <div className="fixed bottom-8 right-32 z-50">
          <Button onClick={updateScale(0.2)} disabled={scale >= MAX_SCALE}>
            +
          </Button>
          <Button onClick={updateScale(-0.2)} disabled={scale <= MIN_SCALE}>
            -
          </Button>
        </div>
        {brackets?.length &&
          brackets.map((rounds, bracketIndex) => {
            return (
              <Bracket
                key={"bracket-" + bracketIndex}
                originConnections={originConnections}
                rounds={rounds}
                setRows={updateRows}
                rows={rows}
                bracketNumber={bracketIndex}
                stageId={stageId}
                scale={scale}
              >
                {rounds.map((games, roundIndex) => {
                  return (
                    <BracketRound
                      games={games}
                      key={"round-" + roundIndex}
                      rows={rows}
                      roundIndex={roundIndex}
                      scale={scale}
                    >
                      {games &&
                        games.map((game: BracketGameType) => {
                          return (
                            <div
                              className="flex items-center pointer-events-auto justify-center"
                              key={game.id}
                              style={{
                                ...getRowSpanForGame(rows[game.id]),
                              }}
                            >
                              <BracketGame
                                game={game}
                                winnerConnection={
                                  winnerConnections[game.id] || {}
                                }
                                loserConnection={
                                  loserConnections[game.id] || {}
                                }
                                originConnections={
                                  originConnections[game.id] || []
                                }
                                onClick={onGameClick}
                                selected={selectedGameIds.includes(game.id)}
                                drawNumber={schedule[game.id]}
                                available={availableGameIds.includes(game.id)}
                                background={
                                  !!backgroundGameIds &&
                                  backgroundGameIds.includes(game.id)
                                }
                                scale={scale}
                              />
                              {isFinalResult(winnerConnections[game.id]) && (
                                <div
                                  className="relative"
                                  onClick={() => onGameResultClick(game)}
                                  style={{
                                    transform: `scale(${scale}) translateX(calc(${
                                      scale - 1
                                    } * 100%))`,
                                  }}
                                >
                                  {gameResultChildren || (
                                    <BracketGameFinalResult
                                      connection={winnerConnections[game.id]}
                                      tournamentId={tournamentId}
                                    />
                                  )}
                                </div>
                              )}
                            </div>
                          );
                        })}
                    </BracketRound>
                  );
                })}
              </Bracket>
            );
          })}
      </div>
    </>
  );
}
