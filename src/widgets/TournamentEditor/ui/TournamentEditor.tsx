import { AddStage } from "@/features/AddStage";
import { useState, useEffect } from "react";
import {
  DEFAULTS,
  TournamentStage,
  TournamentStageType,
} from "@/entities/Tournament";
import { generateUUID } from "@/shared/utils/generateUUID";

import { TournamentStageList } from "@/features/TournamentStageList";

export default function TournamentEditor({
  onEditStage,
  tournament,
}: {
  onEditStage: (stage: TournamentStage) => void;
  tournament: {
    name: string;
    stages: TournamentStage[];
  };
}) {
  const [stages, setStages] = useState<TournamentStage[]>(tournament.stages);
  useEffect(() => {
    setStages(tournament.stages);
  }, [tournament.stages]);

  function addStage(type: TournamentStageType) {
    const base = JSON.parse(JSON.stringify(DEFAULTS[type]));
    setStages((prev) => [
      ...prev,
      {
        ...base,
        id: generateUUID(),
        order: prev.length,
      },
    ]);
  }

  function removeStage(stageId: string) {
    const index = stages.findIndex(({ id }) => id === stageId);
    if (index < 0) return;
    const newStages = [...stages];
    newStages.splice(index, 1);
    setStages(newStages);
  }

  return (
    <TournamentStageList
      stages={stages}
      removeStage={removeStage}
      onEditStage={onEditStage}
    >
      <AddStage addStage={addStage} />
    </TournamentStageList>
  );
}
