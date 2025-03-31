import { useEffect, useState } from "react";
import { TournamentStage } from "@/entities/Tournament";
import { useGetTournamentStagesQuery } from "@/shared/api";

import { Nullable } from "@/shared/types";

import TournamentStageSidebarItem from "./TournamentStageSidebarItem";
export default function TournamentStageSidebar({
  dense,
  editChildren,
  tournamentId,
  editedStageId,
  selectedStage,
  onCancel = () => {},
  onSave = () => {},
  onSelectEditedStage,
  onSelectStage,
}: {
  dense?: boolean;
  editChildren?: React.ReactNode;
  tournamentId: string;
  editedStageId?: Nullable<string>;
  selectedStage: TournamentStage;
  onSelectEditedStage?: (stage: TournamentStage) => void;
  onSelectStage: (stage: TournamentStage) => void;
  onCancel?: () => void;
  onSave?: () => void;
}) {
  const { data: stages } = useGetTournamentStagesQuery(
    { tournamentId },
    {
      skip: !tournamentId,
    }
  );

  const [initialLoadDone, setInitialLoadDone] = useState(false);

  useEffect(() => {
    if (initialLoadDone) return;
    if (stages?.length) {
      setInitialLoadDone(true);
      onSelectStage(stages[0]);
    }
  }, [JSON.stringify(stages), initialLoadDone, onSelectStage]);

  return (
    <div className="flex gap-8 px-4  bg-glass backdrop-blur-sm relative">
      {stages?.length &&
        stages.map((s) => {
          return (
            <TournamentStageSidebarItem
              key={s.id}
              stage={s}
              onClick={() => onSelectStage(s)}
              selected={s.id === selectedStage?.id}
              edited={s.id === editedStageId}
            >
              {s.id === selectedStage?.id && editChildren}
            </TournamentStageSidebarItem>
          );
        })}
    </div>
  );
}
