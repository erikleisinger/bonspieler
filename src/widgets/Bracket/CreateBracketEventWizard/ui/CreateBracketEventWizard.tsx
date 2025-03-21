import { useMemo, useState, useContext } from "react";
import { Button } from "@/shared/ui/button";
import { CustomizeBracketEvent } from "@/features/Bracket/CustomizeBracketEvent";
import { CustomizeBracket } from "@/features/Bracket/CustomizeBracket";
import Typography from "@/shared/ui/typography";
import ValidationIcon from "@/shared/ui/validation-icon";
import { getTotalBracketWinners } from "@/shared/Bracket/getTotalBracketWinners";
import { Label } from "@/shared/ui/label";
import { getNewBracketAndWinnerCount } from "../lib/getNewBracketAndWinnerCount";
import { TournamentStageContext } from "@/shared/TournamentStage";
import { generateBracket } from "@/features/Bracket/GenerateBracket";
interface BracketEditorOptionsProps {
  initialNumBrackets?: number;
  initialNumSheets?: number;
  initialNumWinners?: number[];
  initialTeamCount?: number;
  renderBrackets: () => void;
}

export default function CreateBracketWizard({
  initialTeamCount = 16,
  initialNumWinners = [1],
  initialNumSheets = 8,
  renderBrackets,
}: BracketEditorOptionsProps) {
  const { startTeams: maxTeams, endTeams: targetEndTeams } = useContext(
    TournamentStageContext
  );

  const [numWinners, setNumWinners] = useState(initialNumWinners);
  const [numTeams, setNumTeams] = useState(initialTeamCount);
  const [numBrackets, setNumBrackets] = useState(numWinners.length);
  const [numSheets, setNumSheets] = useState(initialNumSheets);

  const isDisabled = useMemo(() => {
    return !numBrackets;
  }, [numBrackets]);

  function generateBracketEvent() {
    renderBrackets({
      ...generateBracket({
        numTeams,
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
    setNumWinners(winners);
  }

  function handleUpdateNumWinners(newWinnerCount: number, index: number) {
    const newWinners = [...numWinners];
    newWinners[index] = newWinnerCount;
    setNumWinners(newWinners);
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
        teamCount={numTeams}
        updateTeamCount={setNumTeams}
        numWinners={numWinners}
        updateNumWinners={setNumWinners}
        numSheets={numSheets}
        updateNumSheets={setNumSheets}
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
              teamCount={numTeams - i}
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
