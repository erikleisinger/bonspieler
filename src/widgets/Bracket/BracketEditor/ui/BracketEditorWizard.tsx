import { useMemo, useState, useContext } from "react";
import { Button } from "@/shared/ui/button";
import { CustomizeBracketEvent } from "@/features/Bracket/CustomizeBracketEvent";
import { CustomizeBracket } from "@/features/Bracket/CustomizeBracket";
import Typography from "@/shared/ui/typography";
import ValidationIcon from "@/shared/ui/validation-icon";
import { getTotalBracketWinners } from "@/shared/Bracket/getTotalBracketWinners";
import { Label } from "@/shared/ui/label";
import { getNewBracketAndWinnerCount } from "../lib";
import {
  generateTournament,
  scheduleTournament,
} from "@erikleisinger/bracket-generator";
import type { BracketConnections } from "@/entities/Bracket";
import { generateReadableIdIndex } from "../lib/generateReadableIdIndex";
import { TournamentStageContext } from "@/shared/TournamentStage";
import { generateBracket } from "@/features/Bracket/GenerateBracket";
interface BracketEditorOptionsProps {
  teamCount: number;
  updateTeamCount: (e: number) => void;
  numWinners: number[];
  updateNumWinners: (e: number[]) => void;
  renderBrackets: () => void;
  numBrackets: number;
  updateNumBrackets: (e: number) => void;
  numSheets: number;
  updateNumSheets: (e: number) => void;
}

export default function BracketEditorWizard({
  teamCount,
  updateTeamCount,
  numWinners,
  updateNumWinners,
  renderBrackets,
  numSheets,
  updateNumSheets,
}: BracketEditorOptionsProps) {
  const { startTeams: maxTeams, endTeams: targetEndTeams } = useContext(
    TournamentStageContext
  );

  const [numBrackets, setNumBrackets] = useState(numWinners.length);
  const isDisabled = useMemo(() => {
    return !numBrackets;
  }, [numBrackets]);

  function generateBracketEvent() {
    renderBrackets({
      ...generateBrackets({
        numTeams: teamCount,
        numWinners,
        numSheets,
      }),
      numSheets,
    });
  }

  function updateNumBrackets(newNumBrackets: number) {
    const { winners, brackets } = getNewBracketAndWinnerCount(
      newNumBrackets,
      numBrackets,
      numWinners
    );
    setNumBrackets(brackets);
    updateNumWinners(winners);
  }

  function handleUpdateNumWinners(newWinnerCount: number, index: number) {
    const newWinners = [...numWinners];
    newWinners[index] = newWinnerCount;
    updateNumWinners(newWinners);
  }

  const totalWinners = getTotalBracketWinners(numWinners);
  const winnersError = !targetEndTeams
    ? null
    : totalWinners > targetEndTeams
    ? [`The next stage has only scheduled ${targetEndTeams} teams. `]
    : null;

  return (
    <div className="flex flex-col gap-4 justify-between  p-8">
      <CustomizeBracketEvent
        teamCount={teamCount}
        updateTeamCount={updateTeamCount}
        numWinners={numWinners}
        updateNumWinners={updateNumWinners}
        numSheets={numSheets}
        updateNumSheets={updateNumSheets}
        numBrackets={numBrackets}
        updateNumBrackets={updateNumBrackets}
        maxTeams={maxTeams}
      ></CustomizeBracketEvent>
      <div className="pl-4  flex flex-col gap-4">
        {Array.from({ length: numBrackets }).map((_, i) => (
          <div
            key={i}
            className=" flex gap-8 bg-glass p-4 shadow-sm rounded-md"
          >
            <Typography tag="h5" className="grow">
              Bracket {i + 1}
            </Typography>
            <CustomizeBracket
              bracketIndex={i}
              teamsEditable={false}
              teamCount={teamCount - i}
              numWinners={numWinners[i]}
              updateNumWinners={(e) => handleUpdateNumWinners(Number(e), i)}
            />
          </div>
        ))}
        <div className="flex justify-end pr-14">
          <div className="text-right">
            <Label htmlFor="totalAdvancing">Total teams advancing</Label>
            <div className="flex gap-2 items-center justify-end">
              <div className="text-2xl font-bold">{totalWinners}</div>
              <ValidationIcon errors={winnersError} onlyErrors={true} />
            </div>
          </div>
        </div>
      </div>

      <div>
        <Button
          onClick={generateBracketEvent}
          className="w-full"
          disabled={isDisabled}
        >
          Render
        </Button>
      </div>
    </div>
  );
}
