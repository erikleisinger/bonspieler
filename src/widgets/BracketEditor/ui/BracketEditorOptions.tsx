import {
  MAX_BRACKET_COUNT,
  MAX_TEAM_COUNT,
  MAX_WINNER_COUNT,
} from "../lib/constants";

import { Input } from "@/shared/ui/input";
import type { BracketEditorOptionsProps } from "../lib/types/BracketEditorOptions";

export default function BracketEditorOptions({
  teamCount,
  updateTeamCount,
  numWinners,
  updateNumWinners,
  renderBrackets,
  numBrackets,
  updateNumBrackets,
}: BracketEditorOptionsProps) {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <label htmlFor="TEAM_COUNT_INPUT">Team Count</label>
        <Input
          className="text-black w-fit"
          type="number"
          id="TEAM_COUNT_INPUT"
          value={teamCount}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            updateTeamCount(e.target.value)
          }
          onFocus={(e) => e.target.select()}
          max={MAX_TEAM_COUNT}
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="BRACKET_COUNT_INPUT"># Brackets</label>
        <Input
          className="text-black w-fit"
          type="number"
          id="BRACKET_COUNT_INPUT"
          value={numBrackets}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            updateNumBrackets(e.target.value)
          }
          onFocus={(e) => e.target.select()}
          max={MAX_BRACKET_COUNT}
        />
      </div>
      <div className="p-4 pt-0">
        {numBrackets &&
          new Array(numBrackets).fill(0).map((_, i) => (
            <div key={i}>
              <div className="flex flex-col">
                <label htmlFor={"WINNER_COUNT_INPUT" + "-" + i}>
                  Winners bracket {i + 1}
                </label>
                <Input
                  className="text-black w-fit"
                  type="number"
                  id={"WINNER_COUNT_INPUT" + "-" + i}
                  value={numWinners[i]}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    updateNumWinners(e.target.value, i)
                  }
                  onFocus={(e) => e.target.select()}
                  max={MAX_WINNER_COUNT}
                  min={1}
                />
              </div>
            </div>
          ))}
      </div>
      <div>
        <button
          onClick={renderBrackets}
          className="bg-slate-200 text-slate-900 rounded-md p-2"
        >
          render
        </button>
      </div>
    </div>
  );
}
