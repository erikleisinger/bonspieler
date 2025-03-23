import "./animation.scss";
import type { Tables } from "@/shared/api";
import { AddStage, AddStageCard } from "@/features/Tournament/AddStage";
import { useState, useEffect } from "react";
import { TournamentStage, TournamentStageType } from "@/entities/Tournament";
import { TournamentStageList } from "@/features/Tournament/TournamentStageList";
import {
  useGetTournamentStagesQuery,
  useAddTournamentStageMutation,
  useRemoveTournamentStageMutation,
  useUpdateTournamentStagesMutation,
} from "@/shared/api";
export default function TournamentStageEditor({
  onEditStage,
  tournamentId,
}: {
  onEditStage: (stage: TournamentStage) => void;
  tournamentId: string;
}) {
  const { data: stages } = useGetTournamentStagesQuery(tournamentId, {
    refetchOnMountOrArgChange: false,
    skip: !tournamentId,
  });

  const [editedStages, setEditedStages] = useState<
    Tables<"tournament_stages">[]
  >([]);

  useEffect(() => {
    setEditedStages(stages || []);
  }, [stages]);

  const [doAddStage] = useAddTournamentStageMutation();

  const [addingStage, setAddingStage] = useState(false);

  async function addStage(type: TournamentStageType) {
    setAddingStage(true);
    await doAddStage({
      tournamentId,
      stageToAdd: {
        type,
        name: "New Stage",
        order: editedStages.length,
      },
    });
    setAddingStage(false);
  }

  const [doRemoveStage] = useRemoveTournamentStageMutation();

  const [removingStage, setRemovingStage] = useState<string | null>(null);

  async function removeStage(stageId: string) {
    setRemovingStage(stageId);
    const newStages = [...editedStages];
    const index = newStages.findIndex((stage) => stage.id === stageId);
    newStages.splice(index, 1);
    setEditedStages(newStages);
    await doRemoveStage(stageId);
    setRemovingStage(null);
  }

  const [addStageMenuOpen, setAddStageMenuOpen] = useState(false);

  const [doUpdateStages] = useUpdateTournamentStagesMutation();

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

    setEditedStages(newStages);

    await doUpdateStages({
      tournamentId,
      updates: newStages,
    });
  }

  return (
    <>
      <div className="flex  pr-4 md:pr-12 w-fit h-fit">
        <TournamentStageList
          stages={editedStages}
          removeStage={removeStage}
          removingStage={removingStage}
          onEditStage={onEditStage}
          changeStageOrder={handleChangeStageOrder}
          addingStage={addingStage}
        ></TournamentStageList>
        <AddStageCard onClick={() => setAddStageMenuOpen(true)} />
      </div>
      <AddStage
        addStage={addStage}
        endAdd={() => setAddStageMenuOpen(false)}
        active={addStageMenuOpen}
      />
    </>
  );
}
