import {
  MAX_BRACKET_COUNT,
  MAX_TEAM_COUNT,
  MIN_TEAM_COUNT,
} from "@/entities/Bracket";

import NumberInput from "./NumberInput";

import type { CustomizeBracketEventProps } from "../lib";
import ValidationIcon from "@/shared/ui/validation-icon";

/**
 * This component allows the user to set parameters for a bracket event as a whole.
 * To customize an individual bracket, see features/CustomizeBracket
 */

export default function CustomizeBracketEvent({
  teamCount,
  updateTeamCount,
  numBrackets = 1,
  updateNumBrackets,
  numSheets,
  updateNumSheets,
  maxTeams,
}: CustomizeBracketEventProps) {
  const bracketErrors = !numBrackets
    ? ["Number of brackets cannot be 0."]
    : null;

  const teamErrors =
    maxTeams === null
      ? null
      : teamCount > maxTeams
      ? [`Only ${maxTeams} team(s) advanced from the previous round.`]
      : null;

  return (
    <div>
      <section className="mb-12">
        <div className="flex justify-around gap-4">
          <NumberInput
            value={teamCount}
            setValue={updateTeamCount}
            max={MAX_TEAM_COUNT}
            min={MIN_TEAM_COUNT}
            label="Teams"
          >
            <ValidationIcon errors={teamErrors} onlyErrors={true} />
          </NumberInput>
          <NumberInput
            value={numBrackets}
            setValue={updateNumBrackets}
            min={1}
            max={MAX_BRACKET_COUNT}
            label="Brackets"
          >
            <div className="flex gap-2">
              <div>How many brackets?</div>
              <ValidationIcon errors={bracketErrors} onlyErrors={true} />
            </div>
          </NumberInput>
        </div>
      </section>
      <section>
        <div></div>
      </section>
    </div>
  );
}
