import { AddStage } from "@/features/AddStage";
import { useState, useEffect } from "react";
import {
  DEFAULTS,
  TournamentStage,
  TournamentStageType,
} from "@/entities/Tournament";
import { generateUUID } from "@/shared/utils/generateUUID";
import type { Tournament } from "@/shared/types/Tournament";

import { TournamentStageList } from "@/features/TournamentStageList";

export default function TournamentEditor({
  onEditStage,
  updateTournament,
  tournament,
}: {
  onEditStage: (stage: TournamentStage) => void;
  updateTournament: (tournament: Tournament) => void;
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
    let newStages = [...stages];
    newStages.splice(index, 1);
    newStages = newStages.map((s, i) => ({
      ...s,
      order: i,
    }));
    setStages(newStages);
  }

  function handleChangeStageOrder(
    inc: number,
    stage: TournamentStage,
    currentIndex: number
  ) {
    const newIndex = currentIndex + inc;
    if (newIndex < 0 || newIndex > stages.length - 1) return;

    let newStages = [...stages];
    const thisStage = [...newStages][currentIndex];
    newStages.splice(currentIndex, 1);
    newStages.splice(newIndex, 0, thisStage);

    newStages = newStages.map((stage, i) => ({
      ...stage,
      order: i,
    }));
    const newTournament = { ...tournament, stages: newStages };
    updateTournament(newTournament);
  }

  return (
    <TournamentStageList
      stages={stages}
      removeStage={removeStage}
      onEditStage={onEditStage}
      changeStageOrder={handleChangeStageOrder}
    >
      <AddStage addStage={addStage} />
    </TournamentStageList>
  );
}
