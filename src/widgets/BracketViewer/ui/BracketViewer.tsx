"use client";
import { useEffect } from "react";
import type { BracketRows, BracketGameType } from "@/entities/Bracket";
import {
  Brackets,
  Bracket,
  BracketRound,
  BracketGame,
} from "@/entities/Bracket";
import { getTournamentContextForStage } from "@/shared/Tournament/getTournamentContextForStage";
import { Button } from "@/shared/ui/button";
import { FaArrowLeft } from "react-icons/fa";
import { TournamentBracketStage } from "@/entities/Tournament/types/TournamentStage";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { getCurrentTournament } from "@/entities/Tournament";
import { BracketEventHeader, getSelectedGame } from "@/entities/BracketEvent";
import { BracketNavigator } from "@/features/bracket/BracketNavigator";
import { scrollToGame } from "@/entities/Bracket";
import {
  setBracketEvent,
  setBracketEventRows,
  getBracketEventBrackets,
  getBracketEventConnections,
  getBracketEventDrawTimes,
  getBracketEventReadableIdIndex,
  getBracketEventRows,
  getBracketEventSchedule,
  setSelectedGame,
} from "@/entities/BracketEvent";

export default function BracketViewer({
  onBack,
  stage,
}: {
  onBack: () => void;
  stage: TournamentBracketStage;
}) {
  const dispatch = useAppDispatch();
  const tournament = useAppSelector(getCurrentTournament);
  const stages = tournament?.stages || [];
  const tournamentId = tournament?.id;
  const brackets = useAppSelector(getBracketEventBrackets);
  const connections = useAppSelector(getBracketEventConnections);
  const drawTimes = useAppSelector(getBracketEventDrawTimes);
  const readableIdIndex = useAppSelector(getBracketEventReadableIdIndex);
  const rows = useAppSelector(getBracketEventRows);
  const schedule = useAppSelector(getBracketEventSchedule);
  const selectedGame = useAppSelector(getSelectedGame);

  useEffect(() => {
    dispatch(
      setBracketEvent({
        ...stage,
        rows: {},
        selectedDraw: null,
        selectedGame: null,
      })
    );
  }, [stage.id]);

  const tournamentContext = getTournamentContextForStage(
    stage,
    stages,
    tournamentId
  );

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
      <Brackets
        brackets={brackets}
        connections={connections}
        readableIdIndex={readableIdIndex}
        schedule={schedule}
        drawTimes={drawTimes}
        rows={rows}
        nextStageName={tournamentContext.nextStageName}
      >
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
                          nextStageName={tournamentContext.nextStageName}
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
