import { Button } from "@/shared/ui/button";
import { FaMagic } from "react-icons/fa";
import { useContext } from "react";
import { StageWizardContext } from "../lib";
import { TournamentStageType } from "@/entities/Tournament";
export default function TournamentStageWizardNavigation({
  goBack,
  goNext,
  generateStage,
}: {
  goBack?: () => void;
  goNext?: () => void;
  generateStage?: () => void;
}) {
  const { type } = useContext(StageWizardContext);
  const buttonClass = !type
    ? ""
    : {
        [TournamentStageType.Bracket]:
          "bg-bracket-primary text-bracket-primary-foreground hover:bg-bracket-primary/90 hover:text-bracket-primary-foreground",
        [TournamentStageType.Pool]:
          "bg-pool-primary text-pool-primary-foreground hover:bg-pool-primary/90 hover:text-pool-primary-foreground",
        [TournamentStageType.Points]:
          "bg-points-primary text-points-primary-foreground hover:bg-points-primary/90 hover:text-points-primary-foreground",
      }[type];
  return (
    <footer className="px-4 flex justify-between">
      <Button
        onClick={goBack || (() => {})}
        disabled={!goBack}
        variant="secondary"
      >
        Back
      </Button>
      {generateStage ? (
        <Button onClick={generateStage}>
          <FaMagic /> Generate Stage
        </Button>
      ) : (
        <Button
          onClick={goNext || (() => {})}
          disabled={!goNext}
          className={buttonClass}
        >
          Next
        </Button>
      )}
    </footer>
  );
}
