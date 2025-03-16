import "./animation.scss";
import { AddStage, AddStageCard } from "@/features/AddStage";
import { useState } from "react";
import {
  DEFAULTS,
  TournamentStage,
  TournamentStageType,
} from "@/entities/Tournament";
import { generateUUID } from "@/shared/utils/generateUUID";
import type { Tournament } from "@/shared/types/Tournament";

import { TournamentStageList } from "@/features/TournamentStageList";
import {
  TournamentNavigation,
  TournamentTab,
} from "@/features/TournamentNavigation";
import { TournamentTeamList } from "@/widgets/TournamentTeamList";

export default function TournamentEditor({
  onEditStage,
  tournament,
  saveTournament,
}: {
  onEditStage: (stage: TournamentStage) => void;
  saveTournament: (tournament: Tournament) => Promise<void>;
  tournament: Tournament;
}) {
  const tournamentClone = JSON.parse(JSON.stringify(tournament));
  const [editedTournament, setEditedTournament] =
    useState<Tournament>(tournamentClone);

  function addStage(type: TournamentStageType) {
    const base = JSON.parse(JSON.stringify(DEFAULTS[type]));
    const newStages = [
      ...editedTournament.stages,
      {
        ...base,
        id: generateUUID(),
        order: editedTournament.stages.length,
      },
    ];

    setEditedTournament({
      ...tournament,
      stages: newStages,
    });
  }

  function removeStage(stageId: string) {
    const index = editedTournament.stages.findIndex(({ id }) => id === stageId);
    if (index < 0) return;
    let newStages = [...editedTournament.stages];
    newStages.splice(index, 1);
    newStages = newStages.map((s, i) => ({
      ...s,
      order: i,
    }));
    setEditedTournament({
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
    if (newIndex < 0 || newIndex > editedTournament.stages.length - 1) return;

    let newStages = [...editedTournament.stages];
    const thisStage = [...newStages][currentIndex];
    newStages.splice(currentIndex, 1);
    newStages.splice(newIndex, 0, thisStage);

    newStages = newStages.map((stage, i) => ({
      ...stage,
      order: i,
    }));
    const newTournament = { ...tournament, stages: newStages };
    setEditedTournament(newTournament);
  }

  const [addingStage, setAddingStage] = useState(false);

  return (
    <TournamentNavigation
      tournament={tournament}
      tabsChildren={{
        [TournamentTab.Stages]: (
          <>
            <div className="flex m-auto pr-12 w-fit h-fit">
              <TournamentStageList
                stages={editedTournament.stages}
                removeStage={removeStage}
                onEditStage={onEditStage}
                changeStageOrder={handleChangeStageOrder}
              ></TournamentStageList>
              <AddStageCard onClick={() => setAddingStage(true)} />
            </div>
            <AddStage
              addStage={addStage}
              endAdd={() => setAddingStage(false)}
              active={addingStage}
            />
            <div
              className="absolute w-full h-full bg-white/40 backdrop-blur-md z-10"
              style={{
                opacity: addingStage ? 1 : 0,
                pointerEvents: addingStage ? "all" : "none",
              }}
            ></div>
          </>
        ),
        [TournamentTab.Teams]: (
          <div className="m-auto">
            <TournamentTeamList />
          </div>
        ),
      }}
    />
  );
}
