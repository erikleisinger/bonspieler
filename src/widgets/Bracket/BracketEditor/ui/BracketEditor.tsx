"use client";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import {
  getBracketEventBrackets,
  getBracketEventConnections,
  getBracketEventId,
  getBracketEventOrder,
  getBracketEventName,
  getBracketEventRows,
  getBracketEventSchedule,
  getBracketEventReadableIdIndex,
  getBracketEventNumSheets,
  getBracketEventNumTeams,
  getBracketEventNumWinners,
  getSelectedGame,
  setBracketEventRows,
  setSelectedGame,
  setNumSheets,
  setNumTeams,
  setNumWinners,
  setBracketEvent,
} from "@/entities/BracketEvent";

import {
  Brackets,
  Bracket,
  type BracketRows,
  type BracketGameType,
  BracketEvent,
  BracketRound,
  BracketGame,
} from "@/entities/Bracket";
import BracketEditorWizard from "./BracketEditorWizard";
import { Button } from "@/shared/ui/button";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import SaveButton from "@/shared/ui/save-button";
import { BracketEventHeader } from "@/entities/BracketEvent";
import { TournamentStageType } from "@/entities/Tournament/types/TournamentStage";
export default function BracketEditor({
  onBack = () => {},
  onSave = () => {},
}: {
  onBack: () => void;
  onSave: (event: BracketEvent) => void;
}) {
  const dispatch = useAppDispatch();

  const brackets = useAppSelector(getBracketEventBrackets);
  const connections = useAppSelector(getBracketEventConnections);
  const readableIdIndex = useAppSelector(getBracketEventReadableIdIndex);
  const rows = useAppSelector(getBracketEventRows);
  const schedule = useAppSelector(getBracketEventSchedule);
  const selectedGame = useAppSelector(getSelectedGame);
  const numTeams = useAppSelector(getBracketEventNumTeams);
  const numSheets = useAppSelector(getBracketEventNumSheets);
  const numWinners = useAppSelector(getBracketEventNumWinners);
  const name = useAppSelector(getBracketEventName);
  const id = useAppSelector(getBracketEventId);
  const order = useAppSelector(getBracketEventOrder);

  const [showWizard, setShowWizard] = useState(
    !Object.keys(connections || {})?.length
  );

  function renderBracketsFromWizard(newBracketEvent: BracketEvent) {
    dispatch(
      setBracketEvent({
        ...newBracketEvent,
        id,
        order,
        type: TournamentStageType.Bracket,
      })
    );
    setShowWizard(false);
  }

  function updateRows(rowsToAdd: BracketRows) {
    dispatch(setBracketEventRows(rowsToAdd));
  }

  function onGameClick(game: BracketGameType) {
    dispatch(setSelectedGame(game));
  }

  return (
    <div className="fixed inset-0 ">
      {!showWizard ? (
        <div className=" grid grid-rows-[auto_1fr] absolute inset-0">
          <BracketEventHeader
            eventName={name}
            backButton={
              !showWizard && (
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setShowWizard(true)}
                >
                  <FaArrowLeft />
                </Button>
              )
            }
            appendHeaderChildren={
              <div className="flex grow justify-end items-center">
                <SaveButton
                  text={["Save Changes", "Saving...", "Changes saved!"]}
                  onClick={onSave}
                >
                  Save Changes
                </SaveButton>
              </div>
            }
          ></BracketEventHeader>
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
                              selected={
                                !!selectedGame && selectedGame?.id === game.id
                              }
                              rows={rows[game.id] || {}}
                              readableId={readableIdIndex[game.id]}
                              drawNumber={schedule[game.id]}
                              onClick={() => onGameClick(game)}
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
        </div>
      ) : (
        <div />
      )}
      {showWizard && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="absolute left-4 top-6">
            <Button size="icon" variant="ghost" onClick={onBack}>
              <FaArrowLeft />
            </Button>
          </div>
          <div className="m-auto bg-glass text-glass-foreground backdrop-blur-sm  rounded-lg shadow-sm h-screen md:h-[90vh] overflow-auto w-screen md:w-[700px]">
            <BracketEditorWizard
              teamCount={numTeams}
              updateTeamCount={(e) => dispatch(setNumTeams(e))}
              numWinners={numWinners}
              updateNumWinners={(e) => dispatch(setNumWinners(e))}
              renderBrackets={renderBracketsFromWizard}
              numSheets={numSheets}
              updateNumSheets={(e) => dispatch(setNumSheets(e))}
            />
          </div>
          <Button
            className="absolute right-4 top-6"
            variant="ghost"
            size="icon"
            onClick={() => setShowWizard(false)}
          >
            <FaArrowRight />
          </Button>
        </div>
      )}
    </div>
  );
}
