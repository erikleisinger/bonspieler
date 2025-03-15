import "./transition.scss";
import { AddStage } from "@/features/AddStage";
import { useState, useLayoutEffect, useRef, useEffect } from "react";
import {
  TournamentStage,
  TournamentStageType,
} from "../lib/types/TournamentStage";
import { DEFAULTS } from "../lib/constants/default-stage";
import { generateUUID } from "@/shared/utils/generateUUID";
import TournamentStageRotatableCard from "./TournamentStageRotatableCard";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(Flip);
gsap.registerPlugin(useGSAP);
export default function TournamentEditor({
  onEditStage,
  tournament,
}: {
  onEditStage: (stage: TournamentStage) => void;
  tournament: {
    name: string;
    stages: TournamentStage[];
  };
}) {
  const [stages, setStages] = useState<TournamentStage[]>(tournament.stages);
  useEffect(() => {
    setStages(tournament.stages);
  }, [tournament.stages]);

  const flipStateRef = useRef(null);

  useLayoutEffect(() => {
    if (!flipStateRef.current) return;
    // Apply the animation
    Flip.from(flipStateRef.current, {
      duration: 0.8,
      ease: "power4.out",
      stagger: 0.1,
      onComplete: () => {
        // Clear the flip state after animation completes
        flipStateRef.current = null;
      },
    });
  }, [stages.length]);

  function addStage(type: TournamentStageType) {
    flipStateRef.current = Flip.getState(".ANIMATED_CARD");
    const base = JSON.parse(JSON.stringify(DEFAULTS[type]));
    setStages((prev) => [
      ...prev,
      {
        ...base,
        id: generateUUID(),
        order: prev.length,
      },
    ]);
  }

  function removeStage(stageId: string) {
    flipStateRef.current = Flip.getState(".ANIMATED_CARD");
    const index = stages.findIndex(({ id }) => id === stageId);
    if (index < 0) return;
    const newStages = [...stages];
    newStages.splice(index, 1);
    setStages(newStages);
  }

  return (
    <div className="fixed inset-0 flex items-center  overflow-auto px-12">
      <div className=" flex gap-12 items-center relative">
        {stages.map((stage) => {
          return (
            <div key={stage.id} className="ANIMATED_CARD">
              <TournamentStageRotatableCard
                stage={stage}
                removeStage={removeStage}
                editStage={onEditStage}
              />
            </div>
          );
        })}

        <AddStage addStage={addStage} />
      </div>
    </div>
  );
}
