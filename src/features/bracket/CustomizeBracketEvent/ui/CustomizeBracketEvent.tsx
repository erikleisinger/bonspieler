import {
  MAX_BRACKET_COUNT,
  MAX_TEAM_COUNT,
  MIN_TEAM_COUNT,
} from "@/entities/Bracket";

import Typography from "@/shared/ui/typography";
import NumberInput from "@/shared/ui/number-input";
import { TbTournament } from "react-icons/tb";
import { FaCog } from "react-icons/fa";

import type { CustomizeBracketEventProps } from "../lib";
import NumberSheetsSelect from "@/shared/ui/number-sheets-select";
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
      <header className="mb-12">
        <Typography tag="h2">Create Bracket Event</Typography>
      </header>

      <section className="mb-12">
        <header className="mb-6 flex gap-4 items-baseline">
          <FaCog className="text-primary" />
          <Typography tag="h4">Event options</Typography>
        </header>
        <div className="flex flex-col gap-4">
          <NumberInput
            number={teamCount}
            setNumber={updateTeamCount}
            max={MAX_TEAM_COUNT}
            min={MIN_TEAM_COUNT}
          >
            <div className="flex gap-2">
              <div>How many teams?</div>
              <ValidationIcon errors={teamErrors} onlyErrors={true} />
            </div>
          </NumberInput>
          <NumberSheetsSelect
            numSheets={numSheets}
            setNumSheets={updateNumSheets}
          >
            How many sheets of ice?
          </NumberSheetsSelect>
        </div>
      </section>
      <section>
        <header className="mb-6 flex gap-4 items-baseline">
          <TbTournament className="text-blue-500" />
          <Typography tag="h4">Bracket options</Typography>
        </header>

        <div>
          <NumberInput
            number={numBrackets}
            setNumber={updateNumBrackets}
            max={MAX_BRACKET_COUNT}
          >
            <div className="flex gap-2">
              <div>How many brackets?</div>
              <ValidationIcon errors={bracketErrors} onlyErrors={true} />
            </div>
          </NumberInput>
        </div>
      </section>
    </div>
  );
}
