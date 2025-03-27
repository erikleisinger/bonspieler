import { FaTrophy } from "react-icons/fa";
import { FaPersonRunning } from "react-icons/fa6";
import { useContext } from "react";
import { TournamentStageContext } from "@/shared/TournamentStage";
export default function BracketGameFinalResult() {
  const { nextStageName } = useContext(TournamentStageContext);
  function text() {
    return nextStageName ? (
      <div className="text-sm grow font-semibold min-w-[200px]">
        Advances to {nextStageName}
      </div>
    ) : (
      <div className="text-2xl font-bold">Champion</div>
    );
  }

  function icon() {
    return nextStageName ? (
      <FaPersonRunning className="text-emerald-500" />
    ) : (
      <FaTrophy className="text-amber-500" />
    );
  }

  return (
    <div className=" flex gap-2 text-xl px-4  backdrop-blur-md p-2 items-center">
      <div>{icon()}</div>
      {text()}
    </div>
  );
}
