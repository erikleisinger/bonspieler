import type { BracketEditorOptionsProps } from "../lib/types/BracketEditorOptions";
import BracketEditorOptions from "./BracketEditorOptions";
import { useState } from "react";
import { FaCog } from "react-icons/fa";
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
  const [open, setOpen] = useState(true);

  function onRender() {
    setOpen(false);
    renderBrackets();
  }
  return (
    <DropdownMenu defaultOpen={true} open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="secondary" onClick={() => setOpen(!open)}>
          <FaCog />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <div className="p-4">
          <BracketEditorOptions
            teamCount={teamCount}
            updateTeamCount={updateTeamCount}
            numWinners={numWinners}
            updateNumWinners={updateNumWinners}
            renderBrackets={onRender}
            numBrackets={numBrackets}
            updateNumBrackets={updateNumBrackets}
          ></BracketEditorOptions>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
