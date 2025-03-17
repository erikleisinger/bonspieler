import { TournamentStage, TournamentStageType } from "../types/TournamentStage";
import { Button } from "@/shared/ui/button";
import Typography from "@/shared/ui/typography";
import { FaArrowLeft } from "react-icons/fa";

import { BracketEventInfo } from "@/entities/BracketEvent";

export default function TournamentStageInfo({
  onBack,
  onEdit,
  onDelete,
  stage,
}: {
  onBack: () => void;
  onEdit: () => void;
  onDelete?: () => void;
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
          <BracketEventInfo
            schedule={stage.schedule}
            connections={stage.connections}
            brackets={stage.brackets}
            winners={stage.numWinners}
          />
        )}
      </div>
      <footer
        className="grid  gap-4 "
        style={{
          gridTemplateColumns: onDelete ? "repeat(2, 1fr)" : "repeat(1, 1fr)",
        }}
      >
        {onDelete && (
          <Button variant="ghost" onClick={onDelete}>
            Delete
          </Button>
        )}

        <Button onClick={onEdit}>View</Button>
      </footer>
    </>
  );
}
