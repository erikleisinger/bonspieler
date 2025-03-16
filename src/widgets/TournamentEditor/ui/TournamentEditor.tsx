import "./animation.scss";
import { AddStage } from "@/features/AddStage";
import { useState, useEffect } from "react";
import {
  DEFAULTS,
  TournamentStage,
  TournamentStageType,
} from "@/entities/Tournament";
import { generateUUID } from "@/shared/utils/generateUUID";
import type { Tournament } from "@/shared/types/Tournament";
import { Tabs, TabsContent } from "@/shared/ui/tabs";

import { TournamentStageList } from "@/features/TournamentStageList";
import { TournamentNavigation } from "@/features/TournamentNavigation";
import { TournamentTeamList } from "@/widgets/TournamentTeamList";
import { cn } from "@/lib/utils";

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
      <div className="z-20 backdrop-blur-md">
        <TournamentNavigation tournament={tournament} />
      </div>

      <div
        className="relative "
        style={{
          transformStyle: "preserve-3d",
          perspective: "1000px",
        }}
      >
        <div className="absolute inset-0 bg-slate-500/5 backdrop-blur-sm z-[3]" />
        <TabsContent
          value="stages"
          style={{
            transition: "all 0.5s",
          }}
          className={cn(
            "absolute inset-0 transition-all ",
            selectedView !== "stages"
              ? "z-[1] behind overflow-visible"
              : "z-10 ahead overflow-auto"
          )}
          forceMount={true}
        >
          <TournamentStageList
            stages={stages}
            removeStage={removeStage}
            onEditStage={onEditStage}
            changeStageOrder={handleChangeStageOrder}
          >
            <AddStage addStage={addStage} />
          </TournamentStageList>
        </TabsContent>
        <TabsContent
          value="teams"
          style={{
            transition: "all 0.5s",
          }}
          className={cn(
            "absolute inset-0 flex items-center",
            selectedView !== "teams" ? "z-[1] behind" : "z-10 ahead"
          )}
          forceMount={true}
        >
          <div className="m-auto">
            <TournamentTeamList />
          </div>
        </TabsContent>
        <TabsContent
          value="test"
          style={{
            transition: "all 0.5s",
          }}
          className={cn(
            "absolute inset-0 flex items-center",
            selectedView !== "test" ? "z-[1] behind" : "z-10 ahead"
          )}
          forceMount={true}
        >
          <div className="m-auto">
            <TournamentTeamList />
          </div>
        </TabsContent>
      </div>
    </Tabs>
  );
}
