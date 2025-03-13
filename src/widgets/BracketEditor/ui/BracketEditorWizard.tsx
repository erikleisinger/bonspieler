import type { BracketEditorOptionsProps } from "../lib/types/BracketEditorOptions";
import { Button } from "@/shared/ui/button";
import { CustomizeBracketEvent } from "@/features/CustomizeBracketEvent";
import { CustomizeBracket } from "@/features/CustomizeBracket";
import Typography from "@/shared/ui/typography";
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
}: BracketEditorOptionsProps) {
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
      ></CustomizeBracketEvent>
      <div className="pl-4 py-4">
        {Array.from({ length: numBrackets }).map((_, i) => (
          <div
            key={i}
            className="mb-4 flex gap-8 bg-glass p-4 shadow-sm rounded-md"
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
      </div>
      <div>
        <Button onClick={renderBrackets} className="w-full">
          Render
        </Button>
      </div>
    </div>
  );
}
