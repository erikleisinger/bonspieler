"use client";
import { useState } from "react";
import { useAppDispatch } from "@/lib/store";
import type { BracketRows, BracketGameType } from "@/entities/Bracket";
import { Bracket, BracketRound, BracketGame } from "@/entities/Bracket";
import { useAppSelector } from "@/lib/store";

import {
  getWinnerConnections,
  getOriginConnections,
  getLoserConnections,
} from "@/entities/Bracket/BracketGameConnections";
import {
  getBracketGames,
  getBracketGamesReadableIdIndex,
  getBracketGamesSchedule,
} from "@/entities/Bracket/BracketGame";
import { getSelectedGame, setSelectedGame, getSelectedDraw } from "../model";
export default function BracketViewer({
  availableGameIds = [],
  onGameClick,
}: {
  availableGameIds: string[];
  onGameClick: (game: BracketGameType) => void;
}) {
  const dispatch = useAppDispatch();
  const brackets = useAppSelector(getBracketGames);
  const readableIdIndex = useAppSelector(getBracketGamesReadableIdIndex);
  const schedule = useAppSelector(getBracketGamesSchedule);
  const winnerConnections = useAppSelector(getWinnerConnections);
  const originConnections = useAppSelector(getOriginConnections);
  const loserConnections = useAppSelector(getLoserConnections);
  const selectedDraw = useAppSelector(getSelectedDraw);
  const selectedGame = useAppSelector(getSelectedGame);

  const [rows, setRows] = useState<BracketRows>({});

  function updateRows(rows: BracketRows) {
    setRows((prev) => ({
      ...prev,
      ...rows,
    }));
  }

  function defaultOnGameClick(game: BracketGameType) {
    if (!game?.id) return;
    dispatch(setSelectedGame(game.id));
  }

  const handleGameClick = (game: BracketGameType) => {
    if (onGameClick) {
      onGameClick(game);
    } else {
      defaultOnGameClick(game);
    }
  };

  function isGameSelected(gameId: string) {
    if (selectedGame?.id && gameId === selectedGame.id) return true;
    if (!selectedDraw) return false;
    const gameDrawNum = schedule[gameId];
    if (gameDrawNum === selectedDraw) return true;
    return false;
  }

  return (
    <>
      <div className="pointer-events-auto">
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
                          <BracketGame
                            key={game.id}
                            game={game}
                            winnerConnection={winnerConnections[game.id]}
                            loserConnection={loserConnections[game.id]}
                            originConnections={originConnections[game.id] || []}
                            onClick={handleGameClick}
                            selected={isGameSelected(game.id)}
                            rows={rows[game.id] || {}}
                            readableId={readableIdIndex[game.id]}
                            drawNumber={schedule[game.id]}
                            available={availableGameIds.includes(game.id)}
                          />
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
