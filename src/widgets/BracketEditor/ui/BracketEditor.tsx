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
import RemoveBracketButton from "./RemoveBracketButton";

import { FaArrowLeft, FaArrowRight, FaCog } from "react-icons/fa";
import BracketEventOptions from "./BracketEventOptions";
import Slideout from "@/shared/ui/slide-out";
import { Nullable } from "@/shared/types";

export default function BracketEditor() {
  /**
   * Bracket params
   */

  /**
   * Number of teams total in the tournament
   */

  const [teamCount, setTeamCount] = useState(19);

  function updateTeamCount(e: string) {
    setTeamCount(getNewTeamCount(e, teamCount));
  }

  /**
   * Number of teams for each bracket
   */

  const [numBracketTeams, setNumBracketTeams] = useState<number[]>([]);

  function updateNumBracketTeams(e: number, index: number) {
    const newNumBracketTeams = [...numBracketTeams];
    newNumBracketTeams[index] = e;
    setNumBracketTeams(newNumBracketTeams);
  }

  /**
   * Number of teams that advance from each bracket.
   */

  const [numWinners, setNumWinners] = useState([1]);

  function updateNumWinners(e: string, index: number) {
    setNumWinners(getNewWinnerCount(e, numWinners, index));
  }

  /**
   * Number of brackets in the tournament
   */

  const [numBrackets, setNumBrackets] = useState(1);

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
    editing: true,
  });

  const [showWizard, setShowWizard] = useState(true);

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

  const [drawTimes, setDrawTimes] = useState<{ [key: number]: Date }>({});

  const [showEventOptions, setShowEventOptions] = useState(false);

  return (
    <BracketEditingContext.Provider
      value={{
        availableGames: bracketState.availableGames,
        editing: bracketState.editing,
        lookingForWinnerConnection: bracketState.lookingForWinnerConnection,
        lookingForLoserConnection: bracketState.lookingForLoserConnection,
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
      }}
    >
      <div className="fixed inset-0 ">
        {!showWizard ? (
          <Brackets
            brackets={bracketState.brackets}
            drawTimes={drawTimes}
            schedule={bracketState.schedule}
            connections={bracketState.connections}
            updateRows={updateRows}
            rows={bracketState.rows}
            readableIdIndex={bracketState.readableIdIndex}
            infoChildren={<GameEditOptions />}
            appendNavigatorChildren={
              bracketState.brackets?.length ? (
                <RemoveBracketButton onClick={handleRemoveBracket} />
              ) : (
                <div />
              )
            }
            prependNavigatorChildren={
              <AddNewBracket addBracket={handleAddBracket} />
            }
          >
            <Slideout visible={showEventOptions}>
              {showEventOptions && (
                <BracketEventOptions
                  totalNumDraws={totalNumDraws}
                  totalNumSheets={bracketState.numSheets}
                  totalNumTeams={totalNumTeams}
                  totalNumWinners={totalNumWinners}
                  updateNumSheets={updateNumSheets}
                  updateNumSheetsAndSchedule={(e) => updateNumSheets(e, true)}
                  drawTimes={drawTimes}
                  setDrawTimes={setDrawTimes}
                  onClose={() => setShowEventOptions(false)}
                />
              )}
            </Slideout>
            <Button onClick={() => setShowEventOptions(true)}>
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
        {!showWizard && (
          <Button
            size="icon"
            variant="secondary"
            className=" z-10 absolute top-2 left-2"
            onClick={() => setShowWizard(true)}
          >
            <FaArrowLeft />
          </Button>
        )}
      </div>
    </BracketEditingContext.Provider>
  );
}
