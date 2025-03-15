import { useState, useEffect, useRef } from "react";
import { FaPlus } from "react-icons/fa";
import BracketStageCard from "@/shared/Tournament/BracketStageCard";
import RoundRobinStageCard from "@/shared/Tournament/RoundRobinCard";
import PointsStageCard from "@/shared/Tournament/PointsStageCard";
import { TournamentStageType } from "@/widgets/TournamentEditor/lib/types/TournamentStage";
import BaseCard from "@/shared/Tournament/BaseCard";
export default function AddStage({
  addStage,
}: {
  addStage: (stageType: TournamentStageType) => void;
}) {
  const [adding, setAdding] = useState(false);
  const el = useRef(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (el.current && !el.current.contains(event.target)) {
        setAdding(false);
      }
    }
    if (adding) document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [el, adding]);

  function handleAdd(type: TournamentStageType) {
    addStage(type);
    setAdding(false);
  }

  return (
    <div className="relative">
      <div className="ANIMATED_CARD" onClick={() => setAdding(true)}>
        <BaseCard className="bg-black/20 text-white opacity-[0.3] hover:opacity-[1] transition-all">
          <FaPlus />
        </BaseCard>
      </div>
      <div className="fixed inset-0 z-1  pointer-events-none">
        <div className="absolute inset-0  z-10 overflow-auto flex justify-start md:justify-center items-center pointer-events-none">
          <div
            className=" flex justify-start md:justify-center items-center gap-8  px-4 flex items-center md:justify-center   "
            ref={el}
            style={{
              pointerEvents: adding ? "all" : "none",
            }}
          >
            <div
              style={{
                opacity: adding ? 1 : 0,
                transform: adding
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
                opacity: adding ? 1 : 0,
                transform: adding ? "scale(1)" : "scale(0.9)",
                transition: "all 0.3s",
              }}
              onClick={() => handleAdd(TournamentStageType.Bracket)}
            >
              <BracketStageCard />
            </div>
            <div
              style={{
                opacity: adding ? 1 : 0,
                transform: adding
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
        <div
          className="absolute inset-0 bg-white/20 backdrop-blur-md pointer-events-all"
          style={{
            opacity: adding ? 1 : 0,
            pointerEvents: adding ? "all" : "none",
            transition: "all 0.1s",
          }}
        ></div>
      </div>
    </div>
  );
}
