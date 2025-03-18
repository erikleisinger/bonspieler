"use client";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import {
  getBracketEventBrackets,
  getBracketEventConnections,
  getBracketEventDrawTimes,
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
  ViewableBracketEvent,
} from "@/entities/BracketEvent";
import {
  getNewTeamCount,
  getNewWinnerCount,
  getNewBracketAndWinnerCount,
} from "../lib";
import {
  generateTournament,
  scheduleTournament,
} from "@/shared/utils/generate";
import {
  Brackets,
  Bracket,
  type BracketRows,
  type BracketGameType,
  BracketConnections,
  BracketEvent,
  BracketRound,
  BracketGame,
} from "@/entities/Bracket";
import { useBracketEditorReducer } from "../lib/reducer";
import { BracketEditorActionName } from "../lib";
import { generateReadableIdIndex } from "../lib/generateReadableIdIndex";
import BracketEditorWizard from "./BracketEditorWizard";
import { Button } from "@/shared/ui/button";
import EditBracketOptions from "./EditBracketOptions";

import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import BracketEventOptions from "./BracketEventOptions";
import Slideout from "@/shared/ui/slide-out";
import { Nullable } from "@/shared/types";
import SaveButton from "@/shared/ui/save-button";
import { StageTournamentContext } from "@/shared/types/StageTournamentContext";
import { BracketEventHeader } from "@/entities/BracketEvent";
import {
  TournamentBracketStage,
  TournamentStageType,
} from "@/entities/Tournament/types/TournamentStage";

export default function BracketEditor({
  data = {
    brackets: [],
    connections: {},
    drawTimes: {},
    id: "",
    name: "New Bracket Event",
    numTeams: 16,
    numSheets: 8,
    numWinners: [1],
    schedule: {},
    readableIdIndex: {},
  },
  tournamentContext = {
    id: null,
    order: 0,
    startTeams: null,
    endTeams: null,
    prevStageName: null,
    nextStageName: null,
  },
  onBack = () => {},
  onSave = () => {},
  updateBracketName = () => {},
}: {
  data?: BracketEvent;
  stage: TournamentBracketStage;
  tournamentContext: StageTournamentContext;
  onBack: () => void;
  onSave: (event: BracketEvent) => void;
  updateBracketName: (newName: string) => void;
}) {
  const dispatchStore = useAppDispatch();

  const brackets = useAppSelector(getBracketEventBrackets);
  const connections = useAppSelector(getBracketEventConnections);
  const drawTimes = useAppSelector(getBracketEventDrawTimes);
  const readableIdIndex = useAppSelector(getBracketEventReadableIdIndex);
  const rows = useAppSelector(getBracketEventRows);
  const schedule = useAppSelector(getBracketEventSchedule);
  const selectedGame = useAppSelector(getSelectedGame);
  const numTeams = useAppSelector(getBracketEventNumTeams);
  const numSheets = useAppSelector(getBracketEventNumSheets);
  const numWinners = useAppSelector(getBracketEventNumWinners);

  function onGameClick(game: BracketGameType) {
    dispatchStore(setSelectedGame(game));
  }

  /**
   * Overall bracket state
   */

  const { bracketState, dispatch } = useBracketEditorReducer({
    brackets: data.brackets,
    connections: data.connections,
    numSheets: data.numSheets,
    readableIdIndex: data.readableIdIndex,
    schedule: data.schedule,
  });

  const [showWizard, setShowWizard] = useState(
    !Object.keys(data?.connections || {})?.length
  );

  function renderBracketsFromWizard(newBracketEvent: BracketEvent) {
    dispatchStore(
      setBracketEvent({
        ...newBracketEvent,
        id: data.id,
        name: data.name,
        order: tournamentContext.order ?? 0,
        type: TournamentStageType.Bracket,
      })
    );
    setShowWizard(false);
  }

  function updateRows(rowsToAdd: BracketRows) {
    dispatchStore(setBracketEventRows(rowsToAdd));
  }

  const totalNumDraws = Math.max(...Object.values(bracketState.schedule || {}));

  const [showEventOptions, setShowEventOptions] = useState(false);
  const [bracketToEdit, setBracketToEdit] = useState<Nullable<number>>(null);

  const [eventOptionsTab, setEventOptionsTab] = useState("overview");
  const [bracketEventName, setBracketEventName] = useState(data.name);

  function updateBracketEventName(newName: string) {
    updateBracketName(newName);
    setBracketEventName(newName);
  }

  function openEventOptions(tab: string = "overview") {
    setShowEventOptions(true);
    setEventOptionsTab(tab);
  }

  function editEvent() {
    openEventOptions();
    setBracketToEdit(null);
  }

  return (
    <div className="fixed inset-0 ">
      <Slideout visible={bracketToEdit !== null}>
        {bracketToEdit !== null && (
          <EditBracketOptions
            onClose={() => {
              setBracketToEdit(null);
              setSelectedDraw(null);
            }}
            removeBracket={handleRemoveBracket}
            editEvent={() => openEventOptions()}
          />
        )}
      </Slideout>
      <Slideout visible={showEventOptions}>
        {showEventOptions && (
          <BracketEventOptions
            initialTab={eventOptionsTab}
            totalNumDraws={totalNumDraws}
            totalNumSheets={bracketState.numSheets}
            numWinners={numWinners}
            drawTimes={drawTimes}
            eventName={bracketEventName}
            setEventName={updateBracketEventName}
            setDrawTimes={setDrawTimes}
            onClose={() => {
              setShowEventOptions(false);
              setSelectedDraw(null);
            }}
          />
        )}
      </Slideout>
      {!showWizard ? (
        <div className=" grid grid-rows-[auto_1fr] absolute inset-0">
          <BracketEventHeader
            eventName={bracketEventName}
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
                              nextStageName={tournamentContext.nextStageName}
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
              updateTeamCount={(e) => dispatchStore(setNumTeams(e))}
              numWinners={numWinners}
              updateNumWinners={(e) => dispatchStore(setNumWinners(e))}
              renderBrackets={renderBracketsFromWizard}
              numSheets={numSheets}
              updateNumSheets={(e) => dispatchStore(setNumSheets(e))}
              maxTeams={tournamentContext.startTeams}
              targetEndTeams={tournamentContext.endTeams}
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
