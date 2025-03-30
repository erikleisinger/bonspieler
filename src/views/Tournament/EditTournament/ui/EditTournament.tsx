import { useRouter, useParams } from "next/navigation";

/* Types & enums */

import {
  TournamentStageType,
  type TournamentStage,
} from "@/entities/Tournament";

/* Components */
import { TournamentStageEditor } from "@/widgets/Tournament/TournamentStageEditor";
import { TournamentScheduler } from "@/widgets/Tournament/TournamentScheduler";

/* Utils */

import Typography from "@/shared/ui/typography";
import { FaCalendarAlt } from "react-icons/fa";

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
        {/* <div className="bg-glass p-6 rounded-2xl w-fit backdrop-blur-md shadow-sm">
          <Typography tag="h3">Schedule</Typography>
          <TournamentOptions />
        </div> */}
        <div>
          <Typography tag="h2">My Tournament</Typography>
          <Typography tag="p">March 4th, 2025 - March 5th, 2025</Typography>
        </div>
        <div className="mt-8">
          <div className="rounded-sm bg-white/70 backdrop-blur-sm p-4 px-6 w-fit  border-l-4 border-indigo-500">
            <div>
              <header className="flex gap-4 ">
                <div>
                  <div className="p-3 flex items-center bg-indigo-50 rounded-md">
                    <FaCalendarAlt className="text-indigo-500"></FaCalendarAlt>
                  </div>
                </div>

                <div>
                  <Typography tag="h4" className="text-indigo-500 font-bold">
                    Schedule
                  </Typography>
                  <Typography tag="p" className="text-sm text-muted">
                    March 4th, 2025 - March 5th, 2025
                  </Typography>
                </div>
              </header>
              <div className=" py-4">
                <TournamentScheduler />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <Typography tag="h3" className="mb-6 ml-10">
            Stages
          </Typography>
          <TournamentStageEditor
            onEditStage={onEditStage}
            tournamentId={tournamentId}
          />
        </div>
      </div>
    </div>
  );
}
