import { TournamentStage } from "@/entities/Tournament";
import { TournamentStageList } from "@/features/TournamentStageList";

export default function TournamentViewer({
  onViewStage,
  stages,
}: {
  onViewStage: (stage: TournamentStage) => void;
  stages: TournamentStage[];
}) {
  return <TournamentStageList stages={stages} onEditStage={onViewStage} />;
}
