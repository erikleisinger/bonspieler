import { TournamentStage, TournamentStageType } from "../types/TournamentStage";
import BracketStageCard from "@/shared/Tournament/BracketStageCard";
import RoundRobinStageCard from "@/shared/Tournament/RoundRobinCard";
import PointsStageCard from "@/shared/Tournament/PointsStageCard";
import { useState } from "react";
import { cn } from "@/lib/utils";
import TournamentStageInfo from "./TournamentStageInfo";

export default function TournamentStageRotatableCard({
  children,
  className = "",
  editStage,
  removeStage,
  stage,
}: {
  children?: React.ReactNode;
  className?: string;
  editStage: (stage: TournamentStage) => void;
  removeStage: (stageId: string) => void;
  stage: TournamentStage;
}) {
  const [showDetails, setShowDetails] = useState(false);
  return (
    <div
      className={cn(
        " relative tournament-card rotatable pointer-events-auto w-[90vw]  sm:w-[300px] md:w-[350px]  aspect-[4/5]",
        showDetails ? "rotated" : "",
        className
      )}
    >
      <div className="tournament-stage__rotatable-card--content shadow-md absolute inset-0">
        <div className="grid grid-rows-[auto,1fr,auto] gap-4 bg-glass  tournament-stage__section back absolute inset-0 backdrop-blur-md rounded-3xl  0 p-6 grid grid-rows-[1fr,auto] tournament-card__info">
          <TournamentStageInfo
            stage={stage}
            onDelete={removeStage ? () => removeStage(stage.id) : undefined}
            onBack={() => setShowDetails(false)}
            onEdit={() => editStage(stage)}
          />
        </div>
        <div
          className="tournament-stage__section front"
          onClick={() => setShowDetails(true)}
        >
          <div className="absolute bottom-2 md:bottom-6 md:text-lg left-0 right-0 w-fit m-auto text-black/40 font-bold z-10">
            {children}
          </div>
          {stage.type === TournamentStageType.Bracket ? (
            <BracketStageCard name={stage.name} />
          ) : stage.type === TournamentStageType.Pool ? (
            <RoundRobinStageCard name={stage.name} />
          ) : stage.type === TournamentStageType.Points ? (
            <PointsStageCard name={stage.name} />
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  );
}
