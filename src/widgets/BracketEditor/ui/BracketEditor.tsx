"use client";
import {
  MAX_BRACKET_COUNT,
  MAX_TEAM_COUNT,
  MAX_WINNER_COUNT,
  removeWinnerConnection,
} from "../lib";
import type {
  BracketGame as BracketGameType,
  BracketConnections,
} from "@/entities/Bracket";
import BracketEditorOptions from "./BracketEditorOptions";
import { useState, useContext } from "react";
import {
  getNewTeamCount,
  getNewWinnerCount,
  getNewBracketAndWinnerCount,
} from "../lib";
import {
  generateTournament,
  scheduleTournamentGames,
} from "@erikleisinger/bracket-generator";
import { Bracket } from "@/entities/Bracket";
import { BracketEditingContext } from "@/shared/EditableBracket/BracketEditingContext";
import { BracketContext } from "@/shared/Bracket/BracketContext";
import { BracketGame } from "@/entities/Bracket";

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

  function updateNumBrackets(e: any) {
    const { brackets: newBrackets, winners: newWinners } =
      getNewBracketAndWinnerCount(e, numBrackets, numWinners);
    setNumBrackets(newBrackets);
    setNumWinners(newWinners);
  }

  /**
   * Overall bracket state
   */

  const [brackets, setBrackets] = useState<BracketGameType[][]>([]);
  const [connections, setConnections] = useState<BracketConnections>({});
  const [schedule, setSchedule] = useState({});

  function renderBrackets() {
    const tournament = generateTournament(teamCount, numWinners);
    const {
      brackets,
      connections,
    }: { brackets: BracketGameType[][]; connections: BracketConnections } =
      tournament;
    const { schedule: tournamentSchedule } = scheduleTournamentGames(
      connections,
      8
    );
    setSchedule(tournamentSchedule);
    setBrackets(brackets);
    setConnections(connections);
  }

  function handleRemoveWinnerConnection(gameId: string) {
    const newConnections = removeWinnerConnection(gameId, connections);
    setConnections(newConnections);
  }

  return (
    <BracketContext.Provider value={{ schedule, connections }}>
      {/* Add edit game here as a placeholder; * TODO: editing functionality
      will be added later  */}
      <BracketEditingContext.Provider
        value={{
          editing: true,
          editGame: (game: BracketGame) => {
            console.log("you can edit the game!");
          },
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
          <div className="flex flex-col gap-16 relative  w-fit">
            {brackets.map((rounds, bracketIndex) => {
              return (
                <div className="m-8" key={"bracket-" + bracketIndex}>
                  <Bracket rounds={rounds} />
                </div>
              );
            })}
          </div>
        </div>
      </BracketEditingContext.Provider>
    </BracketContext.Provider>
  );
}
