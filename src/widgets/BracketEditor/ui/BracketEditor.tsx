"use client";
import {
  MAX_BRACKET_COUNT,
  MAX_TEAM_COUNT,
  MAX_WINNER_COUNT,
} from "../lib/constants";
import BracketEditorOptions from "./BracketEditorOptions";
import { useState } from "react";
import {
  generateTournament,
  generateTournamentBrackets,
} from "@erikleisinger/bracket-generator";
import { Bracket } from "@/entities/Bracket";
import { BracketEditingContext } from "@/shared/EditableBracket/BracketEditingContext";
import { BracketGame } from "@/entities/Bracket";
export default function BracketEditor({ className }: { className?: string }) {
  const [teamCount, setTeamCount] = useState(19);
  function updateTeamCount(e: any) {
    const newValue = parseInt(e.target.value);
    if (newValue < 1) return;
    if (newValue > MAX_TEAM_COUNT) return;
    setTeamCount(newValue);
  }

  const [numWinners, setNumWinners] = useState([1]);
  function updateNumWinners(e: any, index: number) {
    const newValue = parseInt(e.target.value);
    if (newValue < 1) return;
    if (newValue > MAX_WINNER_COUNT) return;
    const newArray = [...numWinners];
    newArray[index] = newValue;
    setNumWinners(newArray);
  }

  const [numBrackets, setNumBrackets] = useState(1);

  function updateNumBrackets(e: any) {
    const newValue = parseInt(e.target.value);
    if (newValue < 1) return;
    if (newValue > MAX_BRACKET_COUNT) return;
    setNumBrackets(newValue);

    if (numWinners.length - 1 < newValue) {
      const newArray = [...numWinners];
      newArray.push(1);
      setNumWinners(newArray);
    } else if (numWinners.length > newValue) {
      const newArray = [...numWinners];
      newArray.pop();
      setNumWinners(newArray);
    }
  }

  const [brackets, setBrackets] = useState([]);
  const [connections, setConnections] = useState({});

  function renderBrackets() {
    const bracketMap = generateTournament(teamCount, numWinners);
    const tournament = generateTournamentBrackets(bracketMap, teamCount);
    const { brackets, connections } = tournament;
    setBrackets(brackets);
    setConnections(connections);
  }

  return (
    /**
     * Add edit game here as a placeholder;
     * TODO: editing functionality will be added later
     */
    <BracketEditingContext.Provider
      value={{
        editGame: (game: BracketGame) => {
          console.log("you can edit the game!");
        },
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
                <Bracket
                  connections={connections}
                  rounds={rounds}
                  bracketNumber={bracketIndex + 1}
                />
              </div>
            );
          })}
        </div>
      </div>
    </BracketEditingContext.Provider>
  );
}
