import { useRef, useEffect } from "react";
import { TournamentStage, TournamentStageType } from "../types/TournamentStage";
import BracketStageCard from "@/shared/Tournament/BracketStageCard";
import RoundRobinStageCard from "@/shared/Tournament/RoundRobinCard";
import PointsStageCard from "@/shared/Tournament/PointsStageCard";
import { CSSProperties, useState } from "react";
import { cn } from "@/lib/utils";
import TournamentStageInfo from "./TournamentStageInfo";
import { AddStageCardLoading } from "@/features/Tournament/AddStage";

export default function TournamentStageRotatableCard({
  children,
  className = "",
  editStage,
  index,
  isRemoving,
  removeStage,
  stage,
  style,
}: {
  children?: React.ReactNode;
  className?: string;
  editStage: (stage: TournamentStage) => void;
  index: number;
  isRemoving: boolean;
  removeStage: (stageId: string) => void;
  stage: TournamentStage;
  style?: CSSProperties;
}) {
  const [showDetails, setShowDetails] = useState(false);

  const el = useRef<HTMLDivElement>(null);

  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (!el.current) return;
    function onMouseOver() {
      setHovered(true);
    }
    function onMouseOut() {
      setHovered(false);
    }
    el.current.addEventListener("mouseover", onMouseOver);
    el.current.addEventListener("mouseleave", onMouseOut);
    return () => {
      el.current?.removeEventListener("mouseover", onMouseOver);
      el.current?.removeEventListener("mouseleave", onMouseOut);
    };
  }, [el]);

  return isRemoving ? (
    <AddStageCardLoading />
  ) : (
    <div
      ref={el}
      style={{
        perspective: "1000px",
        transition: "transform 0.3s",
        transform: showDetails
          ? `translateX(calc(${index * -1 * 60}% + 10%) ) `
          : hovered
          ? `translateX(calc(${index * -1 * 60}% + 10%) ) `
          : `translateX(${index * -1 * 60}%) translateZ(${index * 1 * 100}px) `,
        zIndex: showDetails || hovered ? 50 - index : 20 - index,
        pointerEvents: "all",
      }}
    >
      <div
        className={cn(
          " relative tournament-card rotatable pointer-events-auto w-[90vw]  sm:w-[100px] md:w-[300px]  aspect-[4/5] rounded-3xl",
          showDetails ? "rotated" : "",
          className
        )}
        style={{
          transform: showDetails
            ? ""
            : hovered
            ? `rotate3d(0, 1, 0, 0deg)  `
            : `rotate3d(0, 1, 0, -30deg)  `,
          transformStyle: "preserve-3d",
          transformOrigin: "center",
          transition: "all 0.3s",
        }}
      >
        <div className="tournament-stage__rotatable-card--content shadow-md absolute inset-0 shadow-lg ">
          <div className="grid grid-rows-[auto,1fr,auto] gap-4 bg-white/90 backdrop-blur-md  tournament-stage__section back absolute inset-0 backdrop-blur-md rounded-3xl  0 p-6 grid grid-rows-[1fr,auto] tournament-card__info">
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
    </div>
  );
}
