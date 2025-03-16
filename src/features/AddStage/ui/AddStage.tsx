import { useEffect, useRef } from "react";

import BracketStageCard from "@/shared/Tournament/BracketStageCard";
import RoundRobinStageCard from "@/shared/Tournament/RoundRobinCard";
import PointsStageCard from "@/shared/Tournament/PointsStageCard";
import { TournamentStageType } from "@/entities/Tournament";
export default function AddStage({
  addStage,
  active,
  endAdd,
}: {
  addStage: (stageType: TournamentStageType) => void;
  active: boolean;
  endAdd: () => void;
}) {
  const el = useRef(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      console.log(el?.current && !el.current.contains(event.target));
      if (el?.current && !el.current.contains(event.target)) {
        endAdd();
      }
    }
    if (active) document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [el, active]);

  function handleAdd(type: TournamentStageType) {
    addStage(type);
    endAdd();
  }

  return (
    <div
      className="absolute top-0 bottom-0 left-0 w-full h-full  z-20 flex items-center"
      style={{
        pointerEvents: active ? "all" : "none",
      }}
    >
      <div
        className="flex justify-start md:justify-center items-center gap-8  px-4 flex items-center md:justify-center m-auto   "
        ref={el}
        style={{
          pointerEvents: active ? "all" : "none",
        }}
      >
        <div
          style={{
            opacity: active ? 1 : 0,
            transform: active
              ? "scale(1) translateX(0)"
              : "scale(0.9) translateX(-10%)",
            transition: "all 0.3s",
          }}
          onClick={() => handleAdd(TournamentStageType.Pool)}
        >
          <RoundRobinStageCard />
        </div>

        <div
          style={{
            opacity: active ? 1 : 0,
            transform: active ? "scale(1)" : "scale(0.9)",
            transition: "all 0.3s",
          }}
          onClick={() => handleAdd(TournamentStageType.Bracket)}
        >
          <BracketStageCard />
        </div>
        <div
          style={{
            opacity: active ? 1 : 0,
            transform: active
              ? "scale(1) translateX(0)"
              : "scale(0.9) translateX(10%)",
            transition: "all 0.3s",
          }}
          onClick={() => handleAdd(TournamentStageType.Points)}
        >
          <PointsStageCard />
        </div>
      </div>
    </div>
  );
}
