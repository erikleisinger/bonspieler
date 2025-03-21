import "./animation.scss";
import { AddStage, AddStageCard } from "@/features/Tournament/AddStage";
import { useState } from "react";
import { TournamentStage, TournamentStageType } from "@/entities/Tournament";
import { TournamentStageList } from "@/features/Tournament/TournamentStageList";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import {
  updateTournamentStages,
  getCurrentTournament,
  addTournamentStage,
  getCurrentTournamentId,
  deleteTournamentStage,
  updateTournamentStageOrder,
} from "@/entities/Tournament";
export default function TournamentStageEditor({
  onEditStage,
}: {
  onEditStage: (stage: TournamentStage) => void;
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
    <>
      <div className="flex  pr-4 md:pr-12 w-fit h-fit">
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
    </>
  );
}
