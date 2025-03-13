import { useState, useContext, useId } from "react";
import { BracketContext } from "@/shared/Bracket/BracketContext";
import { CustomizeBracket } from "@/features/CustomizeBracket";
import Typography from "@/shared/ui/typography";
import { Button } from "@/shared/ui/button";
import { FaPlus } from "react-icons/fa";
import { Checkbox } from "@/shared/ui/checkbox";
import { Label } from "@/shared/ui/label";
export default function AddNewBracket({
  addBracket,
}: {
  addBracket: ({
    numTeams,
    numWinners,
    isSeeded,
  }: {
    numTeams: number;
    numWinners: number;
    isSeeded: boolean;
  }) => void;
}) {
  const [numTeams, setNumTeams] = useState(2);
  const [numWinners, setNumWinners] = useState(1);
  const [isSeeded, setIsSeeded] = useState(true);

  const checkboxId = useId();

  const { brackets, scrollToBracket } = useContext(BracketContext);

  function handleAddBracket() {
    addBracket({
      numTeams,
      numWinners,
      isSeeded,
    });
    setTimeout(() => {
      scrollToBracket(brackets.length);
    }, 1);
  }
  return (
    <div>
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
