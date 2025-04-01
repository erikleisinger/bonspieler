import { useEffect, useState } from "react";
import { TournamentStage } from "@/entities/Tournament";

import { Nullable } from "@/shared/types";

import TournamentStageSelectItem from "./TournamentStageSelectItem";
export default function TournamentStageSelect({
  editChildren,
  editedStage,
  selectedStage,
  onSelectStage,
  stages = [],
}: {
  editChildren?: React.ReactNode;
  editedStage?: Nullable<TournamentStage>;
  selectedStage: TournamentStage;
  onSelectStage: (stage: TournamentStage) => void;
  stages: TournamentStage[];
}) {
  const [initialLoadDone, setInitialLoadDone] = useState(false);

  useEffect(() => {
    if (initialLoadDone) return;
    if (stages?.length) {
      setInitialLoadDone(true);
      onSelectStage(stages[0]);
    }
  }, [JSON.stringify(stages), initialLoadDone, onSelectStage]);

  function isEditedStage(stageId: string) {
    if (!editedStage?.id) return false;
    return editedStage?.id === stageId;
  }
  function isSelectedStage(stageId: string) {
    return selectedStage?.id === stageId;
  }
  return (
    <div className="flex gap-8 px-4  bg-glass backdrop-blur-sm relative">
      {stages?.length &&
        stages.map((s) => {
          return (
            <TournamentStageSelectItem
              key={s.id}
              stage={isEditedStage(s.id) ? editedStage : s}
              onClick={() => onSelectStage(s)}
              selected={isSelectedStage(s.id)}
              edited={isEditedStage(s.id)}
            >
              {isSelectedStage(s.id) && editChildren}
            </TournamentStageSelectItem>
          );
        })}
    </div>
  );
}
