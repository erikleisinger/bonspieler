import { useMemo } from "react";
import type { BracketEditorOptionsProps } from "../lib/types/BracketEditorOptions";
import { Button } from "@/shared/ui/button";
import { CustomizeBracketEvent } from "@/features/CustomizeBracketEvent";
import { CustomizeBracket } from "@/features/CustomizeBracket";
import Typography from "@/shared/ui/typography";
import ValidationIcon from "@/shared/ui/validation-icon";
import { getTotalBracketWinners } from "@/shared/Bracket/getTotalBracketWinners";
import { Label } from "@/shared/ui/label";
export default function BracketEditorWizard({
  teamCount,
  updateTeamCount,
  numWinners,
  updateNumWinners,
  renderBrackets,
  numBrackets,
  updateNumBrackets,
  numSheets,
  updateNumSheets,
  maxTeams,
  targetEndTeams,
}: BracketEditorOptionsProps) {
  const isDisabled = useMemo(() => {
    return !numBrackets;
  }, [numBrackets]);

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
              updateNumWinners={(e) => updateNumWinners(Number(e), i)}
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
          onClick={renderBrackets}
          className="w-full"
          disabled={isDisabled}
        >
          Render
        </Button>
      </div>
    </div>
  );
}
