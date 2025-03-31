import { FaTrophy } from "react-icons/fa";
import { FaPersonRunning } from "react-icons/fa6";
import { useGetTournamentStagesQuery } from "@/shared/api";
import { DestinationConnection } from "../../BracketGameConnections";
export default function BracketGameFinalResult({
  connection,
  tournamentId,
}: {
  connection: DestinationConnection;
  tournamentId: string;
}) {
  const { data: tournamentStages } = useGetTournamentStagesQuery(tournamentId, {
    skip: !tournamentId,
    refetchOnMountOrArgChange: true,
  });

  function text() {
    if (!connection) return <div className="text-muted">???</div>;
    const nextStageName = tournamentStages?.find(
      (stage) => stage.id === connection.stageId
    )?.name;
    return <div>Advances to {nextStageName}</div>;
  }

  function icon() {
    if (!connection) return null;
    return null;
  }

  return (
    <div className=" flex gap-2 text-xl px-4  backdrop-blur-md p-2 items-center BRACKET_GAME_FINAL_RESULT">
      <div>{icon()}</div>
      <div className="whitespace-nowrap">{text()}</div>
    </div>
  );
}
