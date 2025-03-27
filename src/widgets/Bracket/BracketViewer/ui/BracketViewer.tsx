"use client";
import { useEffect, useRef, useState } from "react";

import type {
  BracketRows,
  BracketGameType,
  BracketReadableIdIndex,
  BracketSchedule,
} from "@/entities/Bracket";
import { Bracket, BracketRound, BracketGame } from "@/entities/Bracket";

import {
  WinnerConnections,
  LoserConnections,
} from "@/entities/Bracket/BracketGameConnections";

import BracketGameFinalResult from "@/entities/Bracket/BracketGame/ui/BracketGameFinalResult";
import { OriginConnections } from "@erikleisinger/bracket-generator";
import { Nullable } from "@/shared/types";
import { getRowSpanForGame } from "../lib/getRowSpanForGame";

export default function BracketViewer({
  availableGameIds = [],
  backgroundGameIds,
  gameResultChildren,
  onBackgroundClick,
  onGameClick,
  onGameResultClick = () => {},
  brackets,
  readableIdIndex,
  schedule,
  winnerConnections,
  originConnections,
  loserConnections,
  selectedDraw,
  selectedGame,
}: {
  availableGameIds: string[];
  backgroundGameIds?: Nullable<string[]>;
  gameResultChildren?: React.ReactNode;
  onBackgroundClick?: () => void;
  onGameClick: (game: BracketGameType) => void;
  onGameResultClick: (game: BracketGameType) => void;
  brackets: BracketGameType[][][];
  readableIdIndex: BracketReadableIdIndex;
  schedule: BracketSchedule;
  winnerConnections: WinnerConnections;
  originConnections: OriginConnections;
  loserConnections: LoserConnections;
  selectedDraw?: Nullable<number>;
  selectedGame?: Nullable<BracketGameType>;
}) {
  const [rows, setRows] = useState<BracketRows>({});

  function updateRows(rows: BracketRows) {
    setRows((prev) => ({
      ...prev,
      ...rows,
    }));
  }

  const handleGameClick = (game: BracketGameType) => {
    if (onGameClick) {
      onGameClick(game);
    }
  };

  function isGameSelected(gameId: string) {
    if (selectedGame?.id && gameId === selectedGame.id) return true;
    if (!selectedDraw) return false;
    const gameDrawNum = schedule[gameId];
    if (gameDrawNum === selectedDraw) return true;
    return false;
  }

  const el = useRef(null);
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (
        e
          .composedPath()
          .map((el) => Array.from(el?.classList || []))
          .flat()
          .includes("BRACKET_GAME")
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

  function getReadableOriginConnectionsForGame(gameId: string) {
    const originConnectionsForGame = (originConnections || {})[gameId] || [];
    const atLeastTwoConnections = new Array(2)
      .fill({
        gameId: null,
        isWinner: false,
      })
      .map((e, i) => {
        if (originConnectionsForGame[i]) return originConnectionsForGame[i];
        return e;
      })
      .map((e) => ({
        ...e,
        gameId: e.gameId ? readableIdIndex[e.gameId] : null,
      }));
    return atLeastTwoConnections;
  }

  return (
    <>
      <div ref={el} className="pointer-events-auto backdrop-blur-sm">
        {brackets.map((rounds, bracketIndex) => {
          return (
            <Bracket
              key={"bracket-" + bracketIndex}
              originConnections={originConnections}
              rounds={rounds}
              setRows={updateRows}
              rows={rows}
              bracketNumber={bracketIndex}
            >
              {rounds.map((games, roundIndex) => {
                return (
                  <BracketRound
                    games={games}
                    key={"round-" + roundIndex}
                    rows={rows}
                    roundIndex={roundIndex}
                  >
                    {games &&
                      games.map((game: BracketGameType) => {
                        return (
                          <div
                            className="flex items-center pointer-events-auto"
                            key={game.id}
                            style={{
                              ...getRowSpanForGame(rows[game.id]),
                            }}
                          >
                            <BracketGame
                              game={game}
                              winnerConnection={winnerConnections[game.id]}
                              loserReadableId={
                                readableIdIndex[loserConnections[game.id]]
                              }
                              originConnections={getReadableOriginConnectionsForGame(
                                game.id
                              )}
                              onClick={handleGameClick}
                              selected={isGameSelected(game.id)}
                              rows={rows[game.id] || {}}
                              readableId={readableIdIndex[game.id]}
                              drawNumber={schedule[game.id]}
                              available={availableGameIds.includes(game.id)}
                              background={
                                !!backgroundGameIds &&
                                backgroundGameIds.includes(game.id)
                              }
                            />
                            {!winnerConnections[game.id] && (
                              <div
                                className="relative"
                                onClick={() => onGameResultClick(game)}
                              >
                                {gameResultChildren || (
                                  <BracketGameFinalResult />
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
