import "./animation.scss";
import { AddStage, AddStageCard } from "@/features/AddStage";
import { useState } from "react";
import {
  DEFAULTS,
  TournamentStage,
  TournamentStageType,
} from "@/entities/Tournament";
import { generateUUID } from "@/shared/utils/generateUUID";

import { TournamentStageList } from "@/features/TournamentStageList";
import {
  TournamentNavigation,
  TournamentTab,
} from "@/features/TournamentNavigation";
import { TournamentTeamList } from "@/widgets/TournamentTeamList";
import SaveButton from "@/shared/ui/save-button";
import { useContext } from "react";
import { TournamentContext } from "@/entities/Tournament/lib";
export default function TournamentEditor({
  onEditStage,
  saveTournament,
}: {
  onEditStage: (stage: TournamentStage) => void;
  saveTournament: () => Promise<void>;
}) {
  const {
    id: tournamentId,
    stages,
    updateTournament,
  } = useContext(TournamentContext);

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

    updateTournament({
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
    updateTournament({
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

    updateTournament({ stages: newStages });
  }

  const [addingStage, setAddingStage] = useState(false);

  return (
    <TournamentNavigation
      tabsChildren={{
        [TournamentTab.Stages]: (
          <>
            <div className="flex m-auto pr-4 md:pr-12 w-fit h-fit">
              <TournamentStageList
                stages={stages}
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
            <TournamentTeamList tournamentId={tournamentId} />
          </div>
        ),
      }}
    >
      <footer className="p-4 flex justify-end bg-glass backdrop-blur-md">
        <SaveButton onClick={saveTournament}></SaveButton>
      </footer>
    </TournamentNavigation>
  );
}
