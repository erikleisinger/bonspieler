import { TournamentStage } from "@/entities/Tournament";
import { useGetTournamentStagesQuery } from "@/shared/api";
import {
  TournamentStageListItemContainer,
  TournamentStageSelectionList,
} from "@/features/Tournament/TournamentStageList";
import Typography from "@/shared/ui/typography";
import { Button } from "@/shared/ui/button";
import { FaArrowLeft } from "react-icons/fa";
export default function TournamentStageSidebar({
  tournamentId,
  selectedStage,
  onSelectStage,
}: {
  tournamentId: string;
  selectedStage: TournamentStage;
  onSelectStage: (stage: TournamentStage) => void;
}) {
  const { data: stages } = useGetTournamentStagesQuery(tournamentId, {
    refetchOnMountOrArgChange: false,
    skip: !tournamentId,
  });
  return (
    <div className="h-full relative   z-50 pointer-events-none backdrop-blur-sm">
      <div className="absolute inset-0 pointer-events-none">
        <TournamentStageListItemContainer />
      </div>
      <div className="p-4 py-2 relative pointer-events-auto ">
        <div className=" flex items-center mb-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onSelectStage(null)}
          >
            <FaArrowLeft />
          </Button>
          <Typography tag="overline" className="px-4 ">
            Viewing Stage
          </Typography>
        </div>
        <div>
          <TournamentStageSelectionList
            stages={stages}
            selectedStage={selectedStage}
            onSelectStage={onSelectStage}
          />
        </div>

        {selectedStage && (
          <div className="px-4 mt-4">
            <Typography tag="h2">{selectedStage.name}</Typography>
          </div>
        )}
      </div>
    </div>
  );
}
