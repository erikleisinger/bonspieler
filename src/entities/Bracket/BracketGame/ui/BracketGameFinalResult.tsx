import { BRACKET_GAME_FINAL_RESULT } from "../../lib/constants/element-id";
import { useGetTournamentStagesQuery } from "@/shared/api";
import { DestinationConnection } from "../../BracketGameConnections";
import { cn } from "@/lib/utils";
export default function BracketGameFinalResult({
  connection,
  tournamentId,
}: {
  connection: DestinationConnection;
  tournamentId: string;
}) {
  const { data: tournamentStages } = useGetTournamentStagesQuery(
    { tournamentId },
    {
      skip: !tournamentId,
    }
  );

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
    <div
      className={cn(
        BRACKET_GAME_FINAL_RESULT,
        " flex gap-2 text-xl px-4  backdrop-blur-md p-2 items-center"
      )}
    >
      <div>{icon()}</div>
      <div className="whitespace-nowrap">{text()}</div>
    </div>
  );
}
