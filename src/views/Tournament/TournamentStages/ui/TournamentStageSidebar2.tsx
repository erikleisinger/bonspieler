import { useEffect, useState } from "react";
import { TournamentStage } from "@/entities/Tournament";
import { useGetTournamentStagesQuery } from "@/shared/api";

import { Nullable } from "@/shared/types";
import { useAppSelector } from "@/lib/store";
import { getBracketEvent } from "@/entities/BracketEvent";

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
  const editedStage = useAppSelector(getBracketEvent);

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

  function isEditedStage(stageId: string) {
    return editedStageId === stageId;
  }
  function isSelectedStage(stageId: string) {
    return selectedStage?.id === stageId;
  }
  return (
    <div className="flex gap-8 px-4  bg-glass backdrop-blur-sm relative">
      {stages?.length &&
        stages.map((s) => {
          return (
            <TournamentStageSidebarItem
              key={s.id}
              stage={isEditedStage(s.id) ? editedStage : s}
              onClick={() => onSelectStage(s)}
              selected={isSelectedStage(s.id)}
              edited={isEditedStage(s.id)}
            >
              {isSelectedStage(s.id) && editChildren}
            </TournamentStageSidebarItem>
          );
        })}
    </div>
  );
}
