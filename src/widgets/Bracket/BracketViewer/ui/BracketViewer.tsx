"use client";
import type { BracketRows, BracketGameType } from "@/entities/Bracket";
import {
  Brackets,
  Bracket,
  BracketRound,
  BracketGame,
} from "@/entities/Bracket";
import { Button } from "@/shared/ui/button";
import { FaArrowLeft } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { BracketEventHeader, getSelectedGame } from "@/entities/BracketEvent";
import { BracketNavigator } from "@/features/Bracket/BracketNavigator";
import { scrollToGame } from "@/entities/Bracket";
import {
  setBracketEventRows,
  getBracketEventBrackets,
  getBracketEventConnections,
  getBracketEventReadableIdIndex,
  getBracketEventRows,
  getBracketEventSchedule,
  setSelectedGame,
} from "@/entities/BracketEvent";

export default function BracketViewer({ onBack }: { onBack: () => void }) {
  const dispatch = useAppDispatch();
  const brackets = useAppSelector(getBracketEventBrackets);
  const connections = useAppSelector(getBracketEventConnections);
  const readableIdIndex = useAppSelector(getBracketEventReadableIdIndex);
  const rows = useAppSelector(getBracketEventRows);
  const schedule = useAppSelector(getBracketEventSchedule);
  const selectedGame = useAppSelector(getSelectedGame);

  function updateRows(newRows: BracketRows) {
    dispatch(setBracketEventRows(newRows));
  }

  function onGameClick(game: BracketGameType) {
    dispatch(setSelectedGame(game.id));
    scrollToGame(game.id);
  }

  return (
    <div className=" grid grid-rows-[auto_1fr] absolute inset-0">
      <BracketEventHeader
        eventName={stage.name}
        backButton={
          <Button size="icon" variant="ghost" onClick={onBack}>
            <FaArrowLeft />
          </Button>
        }
      />
      <Brackets>
        {brackets.map((rounds, bracketIndex) => {
          return (
            <Bracket
              key={"bracket-" + bracketIndex}
              connections={connections}
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
                    {games.map((game: BracketGameType) => {
                      return (
                        <BracketGame
                          key={game.id}
                          game={game}
                          connections={connections[game.id]}
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
      </Brackets>
      {
        <div className="fixed right-4 bottom-4 md:right-8 md:bottom-8 z-40 flex flex-col gap-2 ">
          <div className="flex gap-2 items-center justify-end">
            <BracketNavigator numBrackets={brackets?.length || 0} />
          </div>
        </div>
      }
    </div>
  );
}
