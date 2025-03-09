import type { BracketEditorOptionsProps } from "../lib/types/BracketEditorOptions";
import BracketEditorOptions from "./BracketEditorOptions";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/shared/ui/dropdown-menu";
import { Button } from "@/shared/ui/button";
export default function BracketEditorOptionsMenu({
  teamCount,
  updateTeamCount,
  numWinners,
  updateNumWinners,
  renderBrackets,
  numBrackets,
  updateNumBrackets,
}: BracketEditorOptionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="secondary">
          +
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <div className="p-4">
          <BracketEditorOptions
            teamCount={teamCount}
            updateTeamCount={updateTeamCount}
            numWinners={numWinners}
            updateNumWinners={updateNumWinners}
            renderBrackets={renderBrackets}
            numBrackets={numBrackets}
            updateNumBrackets={updateNumBrackets}
          ></BracketEditorOptions>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
