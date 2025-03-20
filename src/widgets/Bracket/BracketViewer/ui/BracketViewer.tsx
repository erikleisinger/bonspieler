"use client";

import type { BracketRows, BracketGameType } from "@/entities/Bracket";
import { Bracket, BracketRound, BracketGame } from "@/entities/Bracket";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { getSelectedGame } from "@/entities/BracketEvent";
import {
  setBracketEventRows,
  getBracketEventConnections,
  getBracketEventRows,
} from "@/entities/BracketEvent";
import {
  getWinnerConnections,
  getOriginConnections,
  getLoserConnections,
} from "@/entities/Bracket/BracketGameConnections";
import {
  getBracketEventBrackets,
  getBracketEventReadableIdIndex,
  getBracketEventSchedule,
} from "@/entities/Bracket/BracketGame";

export default function BracketViewer({
  onGameClick,
}: {
  onGameClick: (game: BracketGameType) => void;
}) {
  const dispatch = useAppDispatch();
  const brackets = useAppSelector(getBracketEventBrackets);
  const connections = useAppSelector(getBracketEventConnections);
  const readableIdIndex = useAppSelector(getBracketEventReadableIdIndex);
  const rows = useAppSelector(getBracketEventRows);
  const schedule = useAppSelector(getBracketEventSchedule);
  const selectedGame = useAppSelector(getSelectedGame);
  const winnerConnections = useAppSelector(getWinnerConnections);
  const originConnections = useAppSelector(getOriginConnections);
  const loserConnections = useAppSelector(getLoserConnections);
  function updateRows(newRows: BracketRows) {
    dispatch(setBracketEventRows(newRows));
  }

  return (
    <>
      {brackets.map((rounds, bracketIndex) => {
        return (
          <Bracket
            key={"bracket-" + bracketIndex}
            connections={connections}
            winnerConnections={winnerConnections}
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
                          onClick={onGameClick}
                          selected={
                            !!selectedGame && selectedGame?.id === game.id
                          }
                          rows={rows[game.id] || {}}
                          readableId={readableIdIndex[game.id]}
                          drawNumber={schedule[game.id]}
                        />
                      );
                    })}
                </BracketRound>
              );
            })}
          </Bracket>
        );
      })}
    </>
  );
}
