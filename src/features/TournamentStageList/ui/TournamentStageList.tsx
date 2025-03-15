import { useLayoutEffect, useRef } from "react";
import type { TournamentStage } from "@/entities/Tournament";
import { TournamentStageRotatableCard } from "@/entities/Tournament";

import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(Flip);
gsap.registerPlugin(useGSAP);
export default function TournamentStageList({
  children,
  onEditStage = () => {},
  removeStage,
  stages = [],
}: {
  children?: React.ReactNode;
  stages: TournamentStage[];
  onEditStage?: (stage: TournamentStage) => void;
  removeStage?: (stageId: string) => void;
}) {
  const flipStateRef = useRef<Flip.FlipState>(null);

  function setFlipState() {
    flipStateRef.current = Flip.getState(".ANIMATED_CARD");
  }

  useLayoutEffect(() => {
    if (!flipStateRef.current) {
      setFlipState();
      return;
    }
    Flip.from(flipStateRef.current, {
      duration: 0.8,
      ease: "power4.out",
      stagger: 0.1,
      onComplete: () => {
        setFlipState();
      },
    });
  }, [stages.length]);

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
        {children}
      </div>
    </div>
  );
}
