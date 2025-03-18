import {
  MAX_TEAM_COUNT,
  MAX_WINNER_COUNT,
  MIN_TEAM_COUNT,
} from "@/entities/Bracket";

import NumberInput from "@/shared/ui/number-input";

import { CustomizeBracketProps } from "../lib";

export default function CustomizeBracket({
  className,
  teamsEditable,
  teamCount,
  updateTeamCount,
  numWinners,
  updateNumWinners,
  bracketIndex,
}: CustomizeBracketProps) {
  return (
    <div className={"flex justify-between gap-2 " + className}>
      <div className="flex gap-4">
        {teamsEditable && (
          <NumberInput
            readOnly={!teamsEditable}
            number={teamCount}
            setNumber={updateTeamCount}
            max={MAX_TEAM_COUNT}
            min={MIN_TEAM_COUNT}
          >
            Teams
          </NumberInput>
        )}

        <NumberInput
          number={numWinners}
          setNumber={(e) => updateNumWinners(e)}
          max={MAX_WINNER_COUNT}
        >
          Teams advancing
        </NumberInput>
      </div>
    </div>
  );
}
