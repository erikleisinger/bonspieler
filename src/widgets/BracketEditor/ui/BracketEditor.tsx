"use client";
import { useState } from "react";
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
  type BracketRows,
  BracketConnections,
  BracketEvent,
} from "@/entities/Bracket";
import { useBracketEditorReducer } from "../lib/reducer";
import { BracketEditingContext } from "@/shared/EditableBracket/BracketEditingContext";
import { BracketEditorActionName } from "../lib";
import { generateReadableIdIndex } from "../lib/generateReadableIdIndex";
import BracketEditorWizard from "./BracketEditorWizard";
import { Button } from "@/shared/ui/button";
import AddNewBracket from "./AddNewBracket";
import EditBracketButton from "./EditBracketButton";
import EditBracketOptions from "./EditBracketOptions";

import { FaArrowLeft, FaArrowRight, FaCog } from "react-icons/fa";
import BracketEventOptions from "./BracketEventOptions";
import Slideout from "@/shared/ui/slide-out";
import { Nullable } from "@/shared/types";
import type { BracketDrawTimes, BracketGame } from "@/entities/Bracket";
import SaveButton from "@/shared/ui/save-button";
import { StageTournamentContext } from "@/shared/types/StageTournamentContext";
import { BracketEventHeader } from "@/entities/BracketEvent";

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
  tournamentContext: StageTournamentContext;
  onBack: () => void;
  onSave: (event: BracketEvent) => void;
  updateBracketName: (newName: string) => void;
}) {
  /**
   * Bracket params
   */

  /**
   * Number of teams total in the tournament
   */

  const [teamCount, setTeamCount] = useState(
    tournamentContext?.startTeams || data.numTeams
  );

  function updateTeamCount(e: number) {
    setTeamCount(getNewTeamCount(e, teamCount));
  }

  /**
   * Number of teams that advance from each bracket.
   */

  const [numWinners, setNumWinners] = useState(data.numWinners);

  function updateNumWinners(e: number, index: number) {
    setNumWinners(getNewWinnerCount(e, numWinners, index));
  }

  /**
   * Number of brackets in the tournament
   */

  const [numBrackets, setNumBrackets] = useState(data.brackets.length);

  /**
   * Number of sheets in use; used to calculate schedule of the games
   */

  function updateNumSheets(e: number, withSchedule: boolean = false) {
    dispatch({
      type: BracketEditorActionName.SetNumSheets,
      args: {
        numSheets: e,
        withSchedule,
      },
    });
  }

  function updateNumBrackets(e: number) {
    const { brackets: newBrackets, winners: newWinners } =
      getNewBracketAndWinnerCount(e, numBrackets, numWinners);
    setNumBrackets(newBrackets);
    setNumWinners(newWinners);
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

  function calculateTournamentSchedule(
    connections: BracketConnections,
    sheets: number
  ) {
    const { schedule: tournamentSchedule } = scheduleTournament(
      connections,
      sheets
    );
    return tournamentSchedule;
  }

  function renderBracketsFromWizard() {
    const tournament = generateTournament(teamCount, numWinners);
    const { brackets, connections: initialConnections } = tournament;
    const tournamentSchedule = calculateTournamentSchedule(
      initialConnections,
      bracketState.numSheets
    );

    dispatch({
      type: BracketEditorActionName.SetInitialState,
      args: {
        connections: initialConnections,
        brackets: [...brackets],
        schedule: tournamentSchedule,
        readableIdIndex: generateReadableIdIndex(brackets),
      },
    });
    setShowWizard(false);
  }

  function handleAddBracket({
    numTeams,
    numWinners,
    isSeeded,
  }: {
    numTeams: number;
    numWinners: number;
    isSeeded: boolean;
  }) {
    dispatch({
      type: BracketEditorActionName.AddBracket,
      args: {
        numTeams,
        numWinners,
        isSeeded,
      },
    });
    setNumBrackets(numBrackets + 1);
    updateNumWinners(numWinners, numBrackets);
  }

  function handleRemoveBracket(bracketIndex: number) {
    dispatch({
      type: BracketEditorActionName.RemoveBracket,
      args: {
        bracketIndex,
      },
    });
    setNumBrackets(numBrackets - 1);
    setBracketToEdit(null);
  }

  function handleAddLoserConnection(destinationGameId: string) {
    const originGameId = bracketState.lookingForLoserConnection;
    if (!originGameId) return;
    dispatch({
      type: BracketEditorActionName.AddLoserConnection,
      args: {
        originGameId,
        destinationGameId,
      },
    });
    dispatch({
      type: BracketEditorActionName.CancelLookForLoserConnection,
      args: null,
    });
  }

  function handleRemoveLoserConnection(gameId: string) {
    dispatch({
      type: BracketEditorActionName.RemoveLoserConnection,
      args: {
        gameId,
      },
    });
  }

  function handleAddGameToRound({
    roundNumber,
    bracketNumber,
    gameIndex,
    offset,
    onSuccess,
  }: {
    roundNumber: number;
    bracketNumber: number;
    gameIndex: number;
    offset?: number;
    onSuccess?: (game: BracketGame) => void;
  }) {
    dispatch({
      type: BracketEditorActionName.AddGameToRound,
      args: {
        roundNumber,
        bracketNumber,
        gameIndex,
        offset,
        onSuccess,
      },
    });
  }

  function handleRemoveGameFromRound({
    gameId,
    bracketNumber,
    roundNumber,
  }: {
    gameId: string;
    bracketNumber: number;
    roundNumber: number;
  }) {
    dispatch({
      type: BracketEditorActionName.RemoveGameFromRound,
      args: {
        gameId,
        bracketNumber,
        roundNumber,
      },
    });
  }

  function handleToggleSeed({
    gameId,
    index,
    teamId,
  }: {
    gameId: string;
    index: number;
    teamId: string;
  }) {
    dispatch({
      type: BracketEditorActionName.ToggleSeed,
      args: {
        gameId,
        index,
        teamId,
      },
    });
  }

  function handleSetSchedule(schedule: { [gameId: string]: number }) {
    dispatch({
      type: BracketEditorActionName.SetSchedule,
      args: {
        schedule,
      },
    });
  }

  function handleLookToAssignTeam({ teamId }: { teamId: string }) {
    dispatch({
      type: BracketEditorActionName.LookToAssignTeam,
      args: {
        teamId,
      },
    });
  }

  function handleAssignTeamToGame({ gameId }: { gameId: string }) {
    if (!bracketState.lookingToAssignTeam) return;
    dispatch({
      type: BracketEditorActionName.AssignTeamToGame,
      args: {
        gameId,
        teamId: bracketState.lookingToAssignTeam,
      },
    });
  }

  function setSelectedDraw(drawNumber: Nullable<number>) {
    dispatch({
      type: BracketEditorActionName.ViewDraw,
      args: {
        drawNumber,
      },
    });
  }

  function deselectAll() {
    dispatch({
      type: BracketEditorActionName.CancelLookForWinnerConnection,
      args: null,
    });
    dispatch({
      type: BracketEditorActionName.CancelLookForLoserConnection,
      args: null,
    });
    dispatch({
      type: BracketEditorActionName.CancelLookToAssignTeam,
      args: null,
    });
  }

  function updateRows(rowsToAdd: BracketRows) {
    dispatch({
      type: BracketEditorActionName.SetRows,
      args: {
        rows: rowsToAdd,
      },
    });
  }

  const totalNumDraws = Math.max(...Object.values(bracketState.schedule || {}));

  const [drawTimes, setDrawTimes] = useState<BracketDrawTimes>(
    Object.entries(data.drawTimes).reduce((all, [drawNum, isoString]) => {
      return {
        ...all,
        [drawNum]: new Date(isoString),
      };
    }, {})
  );

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

  async function handleSave() {
    const formattedEvent = {
      brackets: bracketState.brackets,
      connections: bracketState.connections,
      drawTimes,
      name: bracketEventName,
      numTeams: teamCount,
      numSheets: bracketState.numSheets,
      numWinners,
      schedule: bracketState.schedule,
      readableIdIndex: bracketState.readableIdIndex,
    };

    const clone = JSON.parse(JSON.stringify(formattedEvent));
    await onSave(clone);
  }

  return (
    <BracketEditingContext.Provider
      value={{
        availableGames: bracketState.availableGames,
        editing: bracketState.editing,
        lookingToAssignTeam: bracketState.lookingToAssignTeam,
        lookingForLoserConnection: bracketState.lookingForLoserConnection,
        numWinners,
        selectedDraw: bracketState.selectedDraw,
        lookForLoserConnection: ({
          gameId,
          bracketNumber,
        }: {
          gameId: string;
          bracketNumber: string | number;
        }) => {
          dispatch({
            type: BracketEditorActionName.LookForLoserConnection,
            args: {
              gameId,
              bracketNumber:
                typeof bracketNumber === "string"
                  ? parseInt(bracketNumber)
                  : bracketNumber,
            },
          });
        },
        addLoserConnection: handleAddLoserConnection,
        removeLoserConnection: handleRemoveLoserConnection,
        addGameToRound: handleAddGameToRound,
        removeGameFromRound: handleRemoveGameFromRound,
        toggleSeed: handleToggleSeed,
        deselectAll,
        setSchedule: handleSetSchedule,
        setSelectedDraw,
        showEventEditor: (tab) => openEventOptions(tab),
        updateNumSheets,
        lookToAssignTeam: handleLookToAssignTeam,
        assignTeamToGame: handleAssignTeamToGame,
      }}
    >
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
                    onClick={handleSave}
                  >
                    Save Changes
                  </SaveButton>
                </div>
              }
            ></BracketEventHeader>
            <Brackets
              brackets={bracketState.brackets}
              drawTimes={drawTimes}
              schedule={bracketState.schedule}
              connections={bracketState.connections}
              eventName={bracketEventName}
              updateRows={updateRows}
              rows={bracketState.rows}
              readableIdIndex={bracketState.readableIdIndex}
              appendNavigatorChildren={
                bracketState.brackets?.length ? (
                  <EditBracketButton
                    editBracket={(bracketNum: number) =>
                      setBracketToEdit(bracketNum)
                    }
                  />
                ) : (
                  <div />
                )
              }
              prependNavigatorChildren={
                <AddNewBracket addBracket={handleAddBracket} />
              }
              nextStageName={tournamentContext.nextStageName}
            >
              <Button onClick={editEvent}>
                <FaCog /> Event options
              </Button>
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
                teamCount={teamCount}
                updateTeamCount={updateTeamCount}
                numWinners={numWinners}
                updateNumWinners={updateNumWinners}
                renderBrackets={renderBracketsFromWizard}
                numBrackets={numBrackets}
                updateNumBrackets={updateNumBrackets}
                numSheets={bracketState.numSheets}
                updateNumSheets={updateNumSheets}
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
    </BracketEditingContext.Provider>
  );
}
