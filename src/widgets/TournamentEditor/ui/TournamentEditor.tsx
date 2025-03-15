import { AddStage } from "@/features/AddStage";
import { useState, useEffect } from "react";
import {
  DEFAULTS,
  TournamentStage,
  TournamentStageType,
} from "@/entities/Tournament";
import { generateUUID } from "@/shared/utils/generateUUID";
import type { Tournament } from "@/shared/types/Tournament";
import Typography from "@/shared/ui/typography";
import { Tabs, TabsContent } from "@/shared/ui/tabs";

import { TournamentStageList } from "@/features/TournamentStageList";
import SaveButton from "@/shared/ui/save-button";
import { TournamentNavigation } from "@/features/TournamentNavigation";

export default function TournamentEditor({
  onEditStage,
  updateTournament,
  saveTournament,
  tournament,
}: {
  onEditStage: (stage: TournamentStage) => void;
  saveTournament: (tournament: Tournament) => void;
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
    const newStages = [
      ...stages,
      {
        ...base,
        id: generateUUID(),
        order: stages.length,
      },
    ];
    setStages(newStages);
    updateTournament({
      ...tournament,
      stages: newStages,
    });
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
    updateTournament({
      ...tournament,
      stages: newStages,
    });
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

  const [selectedView, setSelectedView] = useState("stages");

  return (
    <Tabs
      className="fixed inset-0 grid grid-rows-[auto,1fr]"
      value={selectedView}
      onValueChange={setSelectedView}
    >
      <TournamentNavigation tournament={tournament} />

      <TabsContent value="stages" className="relative">
        <TournamentStageList
          stages={stages}
          removeStage={removeStage}
          onEditStage={onEditStage}
          changeStageOrder={handleChangeStageOrder}
        >
          <AddStage addStage={addStage} />
        </TournamentStageList>
      </TabsContent>
    </Tabs>
  );
}
