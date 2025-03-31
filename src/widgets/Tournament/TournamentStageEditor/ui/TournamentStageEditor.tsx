import "./animation.scss";
import type { Tables } from "@/shared/api";
import { useState } from "react";
import { TournamentStage, TournamentStageType } from "@/entities/Tournament";
import {
  TournamentStageList2,
  TournamentStageListItemContainer,
} from "@/features/Tournament/TournamentStageList";
import {
  useGetTournamentStagesQuery,
  useAddTournamentStagesMutation,
  useRemoveTournamentStageMutation,
  useUpdateTournamentStagesMutation,
  useRemoveTournamentStagesMutation,
} from "@/shared/api";
import { generateUUID } from "@/shared/utils/generateUUID";
import { FaPencilAlt, FaCheck } from "react-icons/fa";
export default function TournamentStageEditor({
  onEditStage,
  tournamentId,
}: {
  onEditStage: (stage: TournamentStage) => void;
  tournamentId: string;
}) {
  const { data: stages } = useGetTournamentStagesQuery(
    { tournamentId },
    {
      skip: !tournamentId,
    }
  );

  const [editing, setEditing] = useState(false);

  const [editedStages, setEditedStages] = useState<
    Tables<"tournament_stages">[]
  >([]);

  const [doAddStages] = useAddTournamentStagesMutation();

  async function addStage(type: TournamentStageType, index: number) {
    let newStages = [...(editedStages || [])];
    const newId = generateUUID();
    newStages.splice(index, 0, {
      id: newId,
      name: "New Stage",
      type,
      order: index,
    });
    newStages = sortStages(newStages);
    setEditedStages(newStages);
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

  const [doUpdateStages] = useUpdateTournamentStagesMutation();

  function sortStages(stagesToSort: TournamentStage[]) {
    let newStages = [...stagesToSort];
    newStages = newStages.map((stage, i) => ({
      ...stage,
      order: i + 1,
    }));
    return newStages;
  }

  function updateStages(newStages) {
    setEditedStages(newStages || stages);
  }

  function beginEdit() {
    setEditedStages(stages);
    setEditing(true);
  }

  const [doRemoveStages] = useRemoveTournamentStagesMutation();

  function getDeletedStages() {
    return stages?.filter(
      ({ id }) => !editedStages.some(({ id: stageId }) => id === stageId)
    );
  }

  function getAddedStages() {
    return editedStages?.filter(
      ({ id }) => !stages.some(({ id: stageId }) => id === stageId)
    );
  }

  function getUpdatedStages() {
    return editedStages?.filter(({ id }) =>
      stages.some(({ id: stageId }) => id === stageId)
    );
  }

  async function toggleEdit() {
    if (editing) {
      const deletedStages = getDeletedStages();
      if (deletedStages?.length) {
        await doRemoveStages({
          tournamentId,
          tournamentStageIds: deletedStages.map(({ id }) => id),
        });
      }

      const addedStages = getAddedStages();

      if (addedStages?.length) {
        await doAddStages({
          tournamentId,
          stages: addedStages.map((s) => ({
            ...s,
            tournament_id: tournamentId,
          })),
        });
      }

      const updatedStages = getUpdatedStages();

      if (updatedStages.length) {
        await doUpdateStages({
          tournamentId,
          updates: updatedStages.map((s) => ({
            ...s,
            tournament_id: tournamentId,
          })),
        });
      }

      setEditing(false);
    } else {
      beginEdit();
    }
  }

  return (
    <>
      <div className="flex  pr-4 md:pr-12 w-fit h-fit">
        <TournamentStageList2
          stages={editing ? editedStages : stages}
          removeStage={removeStage}
          onEditStage={!editing ? onEditStage : null}
          onAddStage={editing ? addStage : null}
          onUpdateStages={editing ? updateStages : null}
        >
          <div>
            <TournamentStageListItemContainer
              successful={editing}
              active={!editing}
              onClick={toggleEdit}
            >
              <div className="p-6 flex items-center justify-center relative min-w-[150px] ">
                {editing ? (
                  <FaCheck className="text-[2rem] text-slate-500/70 group-hover:text-emerald-500" />
                ) : (
                  <FaPencilAlt className="text-[1.5rem] text-slate-500/70 group-hover:text-indigo-500" />
                )}
              </div>
            </TournamentStageListItemContainer>
          </div>
        </TournamentStageList2>
      </div>
    </>
  );
}
