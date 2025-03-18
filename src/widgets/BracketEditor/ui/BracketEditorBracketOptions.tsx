import { useContext } from "react";
import { useAppSelector } from "@/lib/store";
import { getCurrentlyViewingBracket } from "@/entities/BracketEvent";
import Typography from "@/shared/ui/typography";
import {
  CustomizeBracket,
  type CustomizeBracketProps,
} from "@/features/CustomizeBracket";
export default function BracketEditorBracketOptions({
  teamCount,
  updateTeamCount,
  numWinners,
  updateNumWinners,
}: CustomizeBracketProps) {
  const currentlyViewingBracket = useAppSelector(getCurrentlyViewingBracket);

  return (
    <>
      <Typography tag="h5">
        Bracket {currentlyViewingBracket + 1} options{" "}
      </Typography>
      <div className="p-4">
        <CustomizeBracket
          teamCount={teamCount}
          updateTeamCount={updateTeamCount}
          numWinners={numWinners[currentlyViewingBracket]}
          updateNumWinners={(e) => updateNumWinners(e, currentlyViewingBracket)}
        ></CustomizeBracket>
      </div>
    </>
  );
}
