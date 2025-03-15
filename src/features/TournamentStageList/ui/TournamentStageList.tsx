import { useLayoutEffect, useRef, useState } from "react";
import type { TournamentStage } from "@/entities/Tournament";
import { TournamentStageRotatableCard } from "@/entities/Tournament";

import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { useGSAP } from "@gsap/react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Button } from "@/shared/ui/button";
gsap.registerPlugin(Flip);
gsap.registerPlugin(useGSAP);
export default function TournamentStageList({
  children,
  onEditStage = () => {},
  changeStageOrder,
  removeStage,
  stages = [],
}: {
  children?: React.ReactNode;
  changeStageOrder?: (
    inc: number,
    stage: TournamentStage,
    currentIndex: number
  ) => void;
  stages: TournamentStage[];
  onEditStage?: (stage: TournamentStage) => void;
  removeStage?: (stageId: string) => void;
}) {
  const flipStateRef = useRef<Flip.FlipState>(null);
  const [flipping, setFlipping] = useState(false);
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
      onStart: () => {
        setFlipping(true);
      },
      onComplete: () => {
        setFlipState();
        setFlipping(false);
      },
    });
  }, [stages]);

  function handleChangeOrder(
    event: MouseEvent,
    inc: number,
    stage: TournamentStage,
    currentIndex: number
  ) {
    if (!changeStageOrder) return;
    event.stopPropagation();
    changeStageOrder(inc, stage, currentIndex);
  }

  return (
    <div className="absolute inset-0 flex items-center  overflow-auto ">
      <div>
        <div
          className=" flex gap-12 items-center relative min-w-full w-fit px-12"
          style={{
            justifyContent: !stages?.length ? "center" : "flex-start",
          }}
        >
          {stages.map((stage, i) => {
            return (
              <div key={stage.id} className="ANIMATED_CARD">
                <TournamentStageRotatableCard
                  stage={stage}
                  removeStage={removeStage}
                  editStage={onEditStage}
                >
                  {changeStageOrder ? (
                    <div className="flex gap-2 items-center ">
                      <Button
                        size="icon"
                        variant="ghost"
                        disabled={flipping}
                        style={{
                          visibility: !i ? "hidden" : "visible",
                        }}
                        onClick={(e) => handleChangeOrder(e, -1, stage, i)}
                      >
                        <FaChevronLeft />
                      </Button>
                      <div>Stage {stage.order + 1}</div>
                      <Button
                        size="icon"
                        variant="ghost"
                        style={{
                          visibility:
                            i >= stages.length - 1 ? "hidden" : "visible",
                        }}
                        disabled={flipping}
                        onClick={(e) => handleChangeOrder(e, 1, stage, i)}
                      >
                        <FaChevronRight />
                      </Button>
                    </div>
                  ) : (
                    <div>Stage {stage.order + 1}</div>
                  )}
                </TournamentStageRotatableCard>
              </div>
            );
          })}
          {children}
        </div>
      </div>
    </div>
  );
}
