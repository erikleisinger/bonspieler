"use client";
import { useEffect, useRef, useState, useContext } from "react";
import { TournamentStageContext } from "../TournamentStage";
import GameConnections from "@/entities/Bracket/ui/GameConnections";
import type {
  BracketRows,
  BracketGameType,
  BracketReadableIdIndex,
  BracketSchedule,
} from "@/entities/Bracket";
import {
  Bracket,
  BracketRound,
  BracketGame,
  BracketRow,
} from "@/entities/Bracket";

import {
  WinnerConnections,
  LoserConnections,
  DestinationConnection,
} from "@/entities/Bracket/BracketGameConnections";

import BracketGameFinalResult from "@/entities/Bracket/BracketGame/ui/BracketGameFinalResult";
import { OriginConnections } from "@erikleisinger/bracket-generator";
import { Nullable } from "@/shared/types";

export default function Brackets({
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
  selectedGameIds = [],
  tournamentId,
  stageId,
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
  selectedGameIds: string[];
  tournamentId: string;
  stageId: string;
}) {
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

  const { stages } = useContext(TournamentStageContext);

  function getReadableOriginConnectionsForGame(gameId: string) {
    const originConnectionsForGame = (originConnections || {})[gameId] || [];
    const atLeastTwoConnections = new Array(2)
      .fill({
        gameId: null,
        isWinner: false,
        stageId: null,
      })
      .map((e, i) => {
        if (originConnectionsForGame[i]) return originConnectionsForGame[i];
        return e;
      })
      .map((e) => {
        if (!!e.stageId && e.stageId !== stageId) {
          return {
            ...e,
            gameId: "From " + stages[e.stageId]?.name,
            isPrevStage: true,
          };
        }
        return {
          ...e,
          gameId: e.gameId
            ? `${e.isWinner ? "Winner" : "Loser"} ${readableIdIndex[e.gameId]}`
            : null,
          isPrevStage: false,
        };
      });
    return atLeastTwoConnections;
  }

  function getLoserReadableId(gameId: string) {
    const loserConnectionsForGame = (loserConnections || {})[gameId];
    if (!loserConnectionsForGame) return null;
    const loserConnection = loserConnectionsForGame;
    return loserConnection?.gameId
      ? readableIdIndex[loserConnection.gameId]
      : null;
  }

  function isFinalResult(winnerConnection: DestinationConnection) {
    const { gameId: winnerGameId, stageId: winnerStageId } =
      winnerConnection || {};
    return !winnerGameId || (!!winnerStageId && winnerStageId !== stageId);
  }

  return (
    <>
      <div ref={el} className="pointer-events-auto">
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
                                loserReadableId={getLoserReadableId(game.id)}
                                originConnections={getReadableOriginConnectionsForGame(
                                  game.id
                                )}
                                onClick={onGameClick}
                                selected={selectedGameIds.includes(game.id)}
                                rows={rows[game.id] || {}}
                                readableId={readableIdIndex[game.id]}
                                drawNumber={schedule[game.id]}
                                available={availableGameIds.includes(game.id)}
                                background={
                                  !!backgroundGameIds &&
                                  backgroundGameIds.includes(game.id)
                                }
                              />
                              {isFinalResult(winnerConnections[game.id]) && (
                                <div
                                  className="relative"
                                  onClick={() => onGameResultClick(game)}
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
