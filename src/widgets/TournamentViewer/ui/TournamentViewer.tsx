import { TournamentStage } from "@/entities/Tournament";
import { TournamentStageList } from "@/features/TournamentStageList";
import {
  TournamentNavigation,
  TournamentTab,
} from "@/features/TournamentNavigation";
import { useAppSelector } from "@/lib/store";
import { getCurrentTournament } from "@/entities/Tournament";

export default function TournamentViewer({
  onViewStage,
}: {
  onViewStage: (stage: TournamentStage) => void;
}) {
  const tournament = useAppSelector(getCurrentTournament);
  const stages = tournament?.stages || [];
  return (
    <TournamentNavigation
      tabsChildren={{
        [TournamentTab.Stages]: (
          <TournamentStageList stages={stages} onEditStage={onViewStage} />
        ),
      }}
    ></TournamentNavigation>
  );
}
