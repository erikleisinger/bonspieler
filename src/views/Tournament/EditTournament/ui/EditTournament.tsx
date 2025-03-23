import { useRouter, useParams } from "next/navigation";

/* Types & enums */

import {
  TournamentStageType,
  type TournamentStage,
} from "@/entities/Tournament";

/* Components */
import { TournamentOptions } from "@/widgets/Tournament/TournamentOptions";
import { TournamentStageEditor } from "@/widgets/Tournament/TournamentStageEditor";

/* Utils */

import Typography from "@/shared/ui/typography";

export default function EditTournament({
  tournamentId,
}: {
  tournamentId: string;
}) {
  const router = useRouter();
  const params = useParams();
  async function onEditStage(stage: TournamentStage) {
    if (stage.type === TournamentStageType.Bracket) {
      router.push(
        `/tournaments/${params.tournamentId}/stages/brackets/${stage.id}/edit/`
      );
    }
  }

  return (
    <div className="h-full grid grid-cols-1 absolute inset-0 p-8 overflow-auto">
      <div className="relative h-full w-full">
        <div className="bg-glass p-6 rounded-2xl w-fit backdrop-blur-md shadow-sm">
          <Typography tag="h3">Schedule</Typography>
          <TournamentOptions />
        </div>
        <div className="bg-glass p-6 rounded-2xl w-fit backdrop-blur-md shadow-sm">
          <Typography tag="h3">Stages</Typography>
          <TournamentStageEditor
            onEditStage={onEditStage}
            tournamentId={tournamentId}
          />
        </div>
      </div>
    </div>
  );
}
