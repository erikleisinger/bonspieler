import { TournamentStage } from "@/entities/Tournament";
import { TournamentStageList } from "@/features/TournamentStageList";
import {
  TournamentNavigation,
  TournamentTab,
} from "@/features/TournamentNavigation";
import { useContext } from "react";
import { TournamentContext } from "@/entities/Tournament/lib";

export default function TournamentViewer({
  onViewStage,
}: {
  onViewStage: (stage: TournamentStage) => void;
}) {
  const { stages } = useContext(TournamentContext);
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
