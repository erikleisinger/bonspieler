import {
  TournamentStage,
  TournamentStageType,
} from "../lib/types/TournamentStage";
import { Button } from "@/shared/ui/button";
import Typography from "@/shared/ui/typography";
import { FaArrowLeft } from "react-icons/fa";
import TournamentBracketStageInfo from "./TournamentBracketStageInfo";

export default function TournamentStageInfo({
  onBack,
  onEdit,
  onDelete,
  stage,
}: {
  onBack: () => void;
  onEdit: () => void;
  onDelete: () => void;
  stage: TournamentStage;
}) {
  return (
    <>
      <header className="flex gap-2 items-center ">
        <Button variant="ghost" size="icon" className="-ml-2" onClick={onBack}>
          <FaArrowLeft />
        </Button>
        <Typography tag="h4">{stage.name}</Typography>
      </header>

      <div className=" p-4">
        {stage.type === TournamentStageType.Bracket && (
          <TournamentBracketStageInfo bracketStage={stage} />
        )}
      </div>
      <footer className="grid grid-cols-2 gap-4 ">
        <Button variant="ghost" onClick={onDelete}>
          Delete
        </Button>
        <Button onClick={onEdit}>View</Button>
      </footer>
    </>
  );
}
