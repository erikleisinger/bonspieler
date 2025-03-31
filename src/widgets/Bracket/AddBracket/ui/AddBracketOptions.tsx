import { useState, useId } from "react";

import { CustomizeBracket } from "@/features/Bracket/CustomizeBracket";
import Typography from "@/shared/ui/typography";
import { Button } from "@/shared/ui/button";
import { FaPlus } from "react-icons/fa";
import { Checkbox } from "@/shared/ui/checkbox";
import { Label } from "@/shared/ui/label";
import { scrollToBracket } from "@/entities/Bracket";
import { useAppSelector } from "@/lib/store";

import { getBracketGames } from "@/entities/Bracket/BracketGame";
export default function AddBracket({
  onAdd = () => {},
}: {
  onAdd?: ({
    numTeams,
    numWinners,
    isSeeded,
  }: {
    numTeams: number;
    numWinners: number[];
    isSeeded: boolean;
  }) => void;
}) {
  const [numTeams, setNumTeams] = useState(2);
  const [numWinners, setNumWinners] = useState(1);
  const [isSeeded, setIsSeeded] = useState(true);
  const checkboxId = useId();
  const brackets = useAppSelector(getBracketGames);

  function handleAddBracket() {
    onAdd({
      numTeams,
      numWinners: [numWinners],
      isSeeded,
    });
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
