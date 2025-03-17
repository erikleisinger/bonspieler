import { FaTrophy } from "react-icons/fa";
import { FaPersonRunning } from "react-icons/fa6";
export default function BracketGameFinalResult({
  nextStageName,
}: {
  nextStageName: string;
}) {
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
    <div className="absolute right-[-1rem] gap-4  top-0 bottom-0 m-auto h-fit translate-x-[100%] flex gap-2 text-xl px-4  backdrop-blur-md p-2 items-center">
      <div>{icon()}</div>
      {text()}
    </div>
  );
}
