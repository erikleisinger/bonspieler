"use client";
import BracketEditorOptions from "./BracketEditorOptions";
import { useState, useReducer } from "react";
import {
  getNewTeamCount,
  getNewWinnerCount,
  getNewBracketAndWinnerCount,
} from "../lib";
import {
  generateTournament,
  scheduleTournament,
} from "@erikleisinger/bracket-generator";
import { Brackets, type BracketRows } from "@/entities/Bracket";
import { BracketViewer } from "@/widgets/BracketViewer";
import { BracketEditingContext } from "@/shared/EditableBracket/BracketEditingContext";
import {
  BracketEditorActionName,
  bracketEditorReducer,
  DEFAULT_BRACKET_EDITOR_STATE,
} from "../lib";

export default function BracketEditor({ className }: { className?: string }) {
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

  function renderBrackets() {
    const tournament = generateTournament(teamCount, numWinners);
    const { brackets, connections: initialConnections } = tournament;
    const { schedule: tournamentSchedule } = scheduleTournament(
      initialConnections,
      8
    );
    dispatch({
      type: BracketEditorActionName.SetInitialState,
      args: {
        connections: initialConnections,
        brackets: [...brackets],
        schedule: tournamentSchedule,
      },
    });
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

  const hasConnections = Object.keys(bracketState.connections).length > 0;

  function cancelLookingListener(e) {
    const isBracketGame = Array.from(e.composedPath()).some((el) => {
      if (!el?.classList) return false;
      return el.classList.contains("BRACKET_GAME");
    });
    if (!isBracketGame) {
      dispatch({
        type: BracketEditorActionName.CancelLookForWinnerConnection,
        args: null,
      });
      dispatch({
        type: BracketEditorActionName.CancelLookForLoserConnection,
        args: null,
      });
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

  return (
    <BracketEditingContext.Provider
      value={{
        availableGames: bracketState.availableGames,
        editing: bracketState.editing,
        lookingForWinnerConnection: bracketState.lookingForWinnerConnection,
        lookingForLoserConnection: bracketState.lookingForLoserConnection,
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
          document.addEventListener("click", cancelLookingListener);
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
      }}
    >
      <div className={className}>
        <BracketEditorOptions
          teamCount={teamCount}
          updateTeamCount={updateTeamCount}
          numWinners={numWinners}
          updateNumWinners={updateNumWinners}
          renderBrackets={renderBrackets}
          numBrackets={numBrackets}
          updateNumBrackets={updateNumBrackets}
        />

        {hasConnections && (
          <div className="mt-8">
            <Brackets
              brackets={bracketState.brackets}
              schedule={bracketState.schedule}
              connections={bracketState.connections}
              updateRows={updateRows}
              rows={bracketState.rows}
            />
          </div>
        )}
      </div>
    </BracketEditingContext.Provider>
  );
}
