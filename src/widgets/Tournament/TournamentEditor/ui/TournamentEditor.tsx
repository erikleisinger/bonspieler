import "./animation.scss";
import { AddStage, AddStageCard } from "@/features/Tournament/AddStage";
import { useState } from "react";
import {
  DEFAULTS,
  TournamentStage,
  TournamentStageType,
} from "@/entities/Tournament";
import { generateUUID } from "@/shared/utils/generateUUID";

import { TournamentStageList } from "@/features/Tournament/TournamentStageList";
import {
  TournamentNavigation,
  TournamentTab,
} from "@/features/Tournament/TournamentNavigation";
import { TournamentTeamList } from "@/features/Tournament/TournamentTeamList";
import SaveButton from "@/shared/ui/save-button";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import {
  updateTournamentStages,
  getCurrentTournament,
  addTournamentStage,
  getCurrentTournamentId,
  deleteTournamentStage,
  updateTournamentStageOrder,
} from "@/entities/Tournament";
export default function TournamentEditor({
  onEditStage,
  saveTournament,
}: {
  onEditStage: (stage: TournamentStage) => void;
  saveTournament: () => Promise<void>;
}) {
  const dispatch = useAppDispatch();
  const tournament = useAppSelector(getCurrentTournament);
  const tournamentId = useAppSelector(getCurrentTournamentId);
  const stages = tournament?.stages || [];

  function addStage(type: TournamentStageType) {
    dispatch(
      addTournamentStage({
        tournamentId,
        stageType: type,
      })
    );
  }

  async function removeStage(stageId: string) {
    await dispatch(deleteTournamentStage(stageId));
    await dispatch(updateTournamentStageOrder());
  }

  async function handleChangeStageOrder(
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

    await dispatch(updateTournamentStages(newStages));
    await dispatch(updateTournamentStageOrder());
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
            <TournamentTeamList />
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
