import { TournamentStage } from "@/entities/Tournament";
import { TournamentStageList } from "@/features/TournamentStageList";
import {
  TournamentNavigation,
  TournamentTab,
} from "@/features/TournamentNavigation";
import { Tournament } from "@/shared/types/Tournament";

export default function TournamentViewer({
  onViewStage,
  tournament,
}: {
  onViewStage: (stage: TournamentStage) => void;
  tournament: Tournament;
}) {
  return (
    <TournamentNavigation
      tournament={tournament}
      tabsChildren={{
        [TournamentTab.Stages]: (
          <TournamentStageList
            stages={tournament.stages}
            onEditStage={onViewStage}
          />
        ),
      }}
    ></TournamentNavigation>
  );
}
