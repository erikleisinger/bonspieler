"use client";
import { useState, useReducer, useEffect } from "react";
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
} from "@/entities/Bracket";

import { BracketEditingContext } from "@/shared/EditableBracket/BracketEditingContext";
import {
  BracketEditorActionName,
  bracketEditorReducer,
  DEFAULT_BRACKET_EDITOR_STATE,
} from "../lib";
import GameEditOptions from "./GameEditOptions";
import { scrollToGame } from "@/entities/Bracket/lib/scrollToGame";
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
import type {
  BracketDrawTimes,
  BracketGame,
  BracketSchedule,
} from "@/entities/Bracket";

export default function BracketEditor({
  data = {
    brackets: [],
    connections: {},
    drawTimes: {},
    eventName: "New Bracket Event",
    numTeams: 16,
    numSheets: 8,
    numWinners: [1],
    schedule: {},
    readableIdIndex: {},
  },
}: {
  data: {
    brackets: BracketGame[][][];
    connections: BracketConnections;
    drawTimes: BracketDrawTimes;
    eventName: string;
    numTeams: number;
    numSheets: number;
    numWinners: number[];
    schedule: BracketSchedule;
    readableIdIndex: { [gameId: string]: string };
  };
}) {
  /**
   * Bracket params
   */

  /**
   * Number of teams total in the tournament
   */

  const [teamCount, setTeamCount] = useState(data.numTeams);

  function updateTeamCount(e: string) {
    setTeamCount(getNewTeamCount(e, teamCount));
  }

  /**
   * Number of teams that advance from each bracket.
   */

  const [numWinners, setNumWinners] = useState(data.numWinners);

  function updateNumWinners(e: string, index: number) {
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

  function updateNumBrackets(e: string) {
    const { brackets: newBrackets, winners: newWinners } =
      getNewBracketAndWinnerCount(e, numBrackets, numWinners);
    setNumBrackets(newBrackets);
    setNumWinners(newWinners);
  }

  /**
   * Overall bracket state
   */

  const [bracketState, dispatch] = useReducer(bracketEditorReducer, {
    ...JSON.parse(JSON.stringify(DEFAULT_BRACKET_EDITOR_STATE)),
    ...{
      brackets: data.brackets,
      connections: data.connections,
      numSheets: data.numSheets,
      readableIdIndex: data.readableIdIndex,
      schedule: data.schedule,
    },
    editing: true,
  });

  const [showWizard, setShowWizard] = useState(!!data?.connections?.length);

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

  function handleRemoveWinnerConnection(gameId: string) {
    dispatch({
      type: BracketEditorActionName.RemoveWinnerConnection,
      args: {
        gameId,
      },
    });
  }

  function handleAddWinnerConnection(destinationGameId: string) {
    const { gameId: originGameId } = bracketState.lookingForWinnerConnection;
    dispatch({
      type: BracketEditorActionName.AddWinnerConnection,
      args: {
        originGameId,
        destinationGameId,
      },
    });
    dispatch({
      type: BracketEditorActionName.CancelLookForWinnerConnection,
      args: null,
    });
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
  }

  function cancelLookingListener(e) {
    const isBracketGame = Array.from(e.composedPath()).some((el) => {
      if (el?.id === "BRACKET_GAME_INFO_CONTAINER") return false;
      if (!el?.classList) return false;
      return el.classList.contains("BRACKET_GAME");
    });
    if (!isBracketGame) {
      deselectAll();
      removeCancelLookingListener();
    }
  }

  function removeCancelLookingListener() {
    document.removeEventListener("click", cancelLookingListener);
  }

  function updateRows(rowsToAdd: BracketRows) {
    dispatch({
      type: BracketEditorActionName.SetRows,
      args: {
        rows: rowsToAdd,
      },
    });
  }

  const totalNumTeams = (bracketState?.brackets || [])
    .flat()
    .flat()
    .flat()
    .reduce((all, { id: gameId }) => {
      return (
        all +
        ((bracketState.connections[gameId]?.teams || []).filter(
          ({ teamId }) => teamId === "seed"
        )?.length || 0)
      );
    }, 0);

  const totalNumDraws = Math.max(...Object.values(bracketState.schedule || {}));

  const totalNumWinners = numWinners.reduce((all, cur) => all + (cur || 0), 0);
  useEffect(() => {
    if (!bracketState?.lookingForLoserConnection) return;
    if (!bracketState?.availableGames?.length) return;
    const [firstAvailableGame] = bracketState.availableGames;
    scrollToGame(firstAvailableGame);
  }, [bracketState?.availableGames?.length]);

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
  const [bracketEventName, setBracketEventName] = useState("New Bracket Event");

  function openEventOptions(tab: string = "overview") {
    setShowEventOptions(true);
    setEventOptionsTab(tab);
  }

  function editEvent() {
    openEventOptions();
    setBracketToEdit(null);
  }

  return (
    <BracketEditingContext.Provider
      value={{
        availableGames: bracketState.availableGames,
        editing: bracketState.editing,
        lookingForWinnerConnection: bracketState.lookingForWinnerConnection,
        lookingForLoserConnection: bracketState.lookingForLoserConnection,
        numWinners,
        selectedDraw: bracketState.selectedDraw,
        lookForWinnerConnection: (
          gameId: string,
          gameIndex: string | number,
          bracketNumber: string | number,
          roundNumber: string | number
        ) => {
          document.addEventListener("click", cancelLookingListener);
          dispatch({
            type: BracketEditorActionName.LookForWinnerConnection,
            args: {
              gameId,
              gameIndex:
                typeof gameIndex === "string" ? parseInt(gameIndex) : gameIndex,
              bracketNumber:
                typeof bracketNumber === "string"
                  ? parseInt(bracketNumber)
                  : bracketNumber,
              roundNumber:
                typeof roundNumber === "string"
                  ? parseInt(roundNumber)
                  : roundNumber,
            },
          });
        },
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
        addWinnerConnection: handleAddWinnerConnection,
        removeWinnerConnection: handleRemoveWinnerConnection,
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
      }}
    >
      <div className="fixed inset-0 ">
        {!showWizard ? (
          <Brackets
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
            brackets={bracketState.brackets}
            drawTimes={drawTimes}
            schedule={bracketState.schedule}
            connections={bracketState.connections}
            eventName={bracketEventName}
            updateRows={updateRows}
            rows={bracketState.rows}
            readableIdIndex={bracketState.readableIdIndex}
            infoChildren={<GameEditOptions />}
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
          >
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
                  totalNumTeams={totalNumTeams}
                  totalNumWinners={totalNumWinners}
                  drawTimes={drawTimes}
                  eventName={bracketEventName}
                  setEventName={setBracketEventName}
                  setDrawTimes={setDrawTimes}
                  onClose={() => {
                    setShowEventOptions(false);
                    setSelectedDraw(null);
                  }}
                />
              )}
            </Slideout>
            <Button onClick={editEvent}>
              <FaCog /> Event options
            </Button>
          </Brackets>
        ) : (
          <div />
        )}
        {showWizard && (
          <div className="fixed inset-0 flex items-center justify-center">
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
              />
            </div>
            <Button
              className="absolute right-2 top-2"
              variant="secondary"
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
