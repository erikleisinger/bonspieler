import {
  MAX_BRACKET_COUNT,
  MAX_TEAM_COUNT,
  MIN_TEAM_COUNT,
} from "@/entities/Bracket";

import Typography from "@/shared/ui/typography";
import NumberInput from "@/shared/ui/number-input";
import { TbTournament } from "react-icons/tb";
import { FaTrophy } from "react-icons/fa";

import type { CustomizeBracketEventProps } from "../lib";

/**
 * This component allows the user to set parameters for a bracket event as a whole.
 * To customize an individual bracket, see features/CustomizeBracket
 */

export default function CustomizeBracketEvent({
  teamCount,
  updateTeamCount,
  numBrackets,
  updateNumBrackets,
  numSheets,
  updateNumSheets,
}: CustomizeBracketEventProps) {
  return (
    <div>
      <header className="mb-12">
        <Typography tag="h2">Create Bracket Event</Typography>
      </header>

      <section className="mb-12">
        <header className="mb-6 flex gap-4 items-baseline">
          <FaTrophy className="text-amber-500" />
          <Typography tag="h4">Event options</Typography>
        </header>
        <div className="flex flex-col gap-4">
          <NumberInput
            number={teamCount}
            setNumber={updateTeamCount}
            max={MAX_TEAM_COUNT}
            min={MIN_TEAM_COUNT}
          >
            How many teams?
          </NumberInput>

          <NumberInput number={numSheets} setNumber={updateNumSheets} min={1}>
            How many sheets of ice?
          </NumberInput>
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
            How many brackets?
          </NumberInput>
        </div>
      </section>
    </div>
  );
}
