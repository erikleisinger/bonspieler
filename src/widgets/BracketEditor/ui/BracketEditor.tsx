"use client";
import type { BracketGame } from "@/entities/Bracket";
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
import { Bracket } from "@/entities/Bracket";
import { BracketEditingContext } from "@/shared/EditableBracket/BracketEditingContext";
import { BracketContext } from "@/shared/Bracket/BracketContext";
import { BracketEditorActionName, bracketEditorReducer } from "../lib";

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

  const [brackets, setBrackets] = useState<BracketGame[][][]>([]);

  const [schedule, setSchedule] = useState({});

  const [bracketState, dispatch] = useReducer(bracketEditorReducer, {
    connections: {},
    editing: true,
    lookingForWinnerConnection: null,
  });

  function renderBrackets() {
    const tournament = generateTournament(teamCount, numWinners);
    const { brackets, connections: initialConnections } = tournament;
    const { schedule: tournamentSchedule } = scheduleTournament(
      initialConnections,
      8
    );
    setSchedule(tournamentSchedule);
    setBrackets(brackets);
    dispatch({
      type: BracketEditorActionName.SetInitialConnections,
      args: {
        connections: initialConnections,
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
      removeCancelLookingListener();
    }
  }

  function removeCancelLookingListener() {
    document.removeEventListener("click", cancelLookingListener);
  }

  return (
    <BracketEditingContext.Provider
      value={{
        editing: bracketState.editing,
        lookingForWinnerConnection: bracketState.lookingForWinnerConnection,
        lookForWinnerConnection: (
          gameId: string,
          bracketNumber: string | number,
          roundNumber: string | number
        ) => {
          document.addEventListener("click", cancelLookingListener);
          dispatch({
            type: BracketEditorActionName.LookForWinnerConnection,
            args: {
              gameId,
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
        addWinnerConnection: handleAddWinnerConnection,
        removeWinnerConnection: handleRemoveWinnerConnection,
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
          <BracketContext.Provider
            value={{ schedule, connections: bracketState.connections }}
          >
            <div className="flex flex-col gap-16 relative  w-fit">
              {brackets.map((rounds, bracketIndex) => {
                return (
                  <div className="m-8" key={"bracket-" + bracketIndex}>
                    <Bracket rounds={rounds} />
                  </div>
                );
              })}
            </div>
          </BracketContext.Provider>
        )}
      </div>
    </BracketEditingContext.Provider>
  );
}
