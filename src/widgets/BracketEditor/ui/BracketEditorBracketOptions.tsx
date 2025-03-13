import { useContext } from "react";
import { BracketContext } from "@/shared/Bracket/BracketContext";
import Typography from "@/shared/ui/typography";
import {
  CustomizeBracket,
  type CustomizeBracketProps,
} from "@/features/CustomizeBracket";
export default function BracketEditorBracketOptions({
  className,
  teamsEditable,
  teamCount,
  updateTeamCount,
  numWinners,
  updateNumWinners,
}: CustomizeBracketProps) {
  const { currentlyViewingBracket } = useContext(BracketContext);

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
