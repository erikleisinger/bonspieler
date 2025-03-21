import { useState, useId } from "react";

import { CustomizeBracket } from "@/features/Bracket/CustomizeBracket";
import Typography from "@/shared/ui/typography";
import { Button } from "@/shared/ui/button";
import { FaPlus } from "react-icons/fa";
import { Checkbox } from "@/shared/ui/checkbox";
import { Label } from "@/shared/ui/label";
import { scrollToBracket } from "@/entities/Bracket";
import { useAppSelector, useAppDispatch } from "@/lib/store";
import {
  getBracketEventNumSheets,
  addBracketToEvent,
} from "@/entities/BracketEvent";
import { getBracketEventBrackets } from "@/entities/Bracket/BracketGame";
import { generateBracket } from "@/features/Bracket/GenerateBracket";
export default function AddBracket() {
  const [numTeams, setNumTeams] = useState(2);
  const [numWinners, setNumWinners] = useState(1);
  const [isSeeded, setIsSeeded] = useState(true);
  const checkboxId = useId();

  const dispatch = useAppDispatch();
  const brackets = useAppSelector(getBracketEventBrackets);
  const numSheets = useAppSelector(getBracketEventNumSheets);

  async function addBracket({
    numTeams,
    numWinners,
    isSeeded,
  }: {
    numTeams: number;
    numWinners: number[];
    isSeeded: boolean;
  }) {
    const data = generateBracket({
      numTeams,
      numWinners,
      numSheets,
      isSeeded,
      bracketIndex: brackets.length,
    });
    await dispatch(addBracketToEvent(data));
  }

  function handleAddBracket() {
    addBracket({
      numTeams,
      numWinners: [numWinners],
      isSeeded,
    });
    setTimeout(() => {
      scrollToBracket(brackets.length);
    }, 1);
  }
  return (
    <div className="p-6">
      <header className="mb-4">
        <Typography tag="h5">Add Bracket</Typography>
      </header>
      <CustomizeBracket
        teamsEditable={true}
        teamCount={numTeams}
        updateTeamCount={setNumTeams}
        numWinners={numWinners}
        updateNumWinners={setNumWinners}
      ></CustomizeBracket>
      <div className="flex gap-2 items-center mt-4">
        <Checkbox
          id={checkboxId}
          checked={isSeeded}
          onCheckedChange={setIsSeeded}
        ></Checkbox>
        <Label htmlFor={checkboxId}>Games are seeded</Label>
      </div>

      <footer className="mt-4">
        <Button className="w-full" onClick={handleAddBracket}>
          <FaPlus />
          Add
        </Button>
      </footer>
    </div>
  );
}
