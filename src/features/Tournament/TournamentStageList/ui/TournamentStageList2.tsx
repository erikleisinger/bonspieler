import "./stages.scss";
import { useState } from "react";
import { TournamentStage, TournamentStageType } from "@/entities/Tournament";

import StageList2Add from "./StageList2Add";
import StageDetailsPopup from "./StageDetailsPopup";
import TournamentStageListItem from "./TournamentStageListItem";
import TournamentStageListItemContainer from "./TournamentStageListItemContainer";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
  DragOverlay,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSwappingStrategy,
} from "@dnd-kit/sortable";
import { SortableItem, Droppable } from "@/shared/ui/Sortable";
import { FaTrashAlt } from "react-icons/fa";
import { Nullable } from "@/shared/types";

export default function TournamentStageList2({
  children,
  onAddStage,
  onEditStage,
  onUpdateStages,
  stages = [],
}: {
  children?: React.ReactNode;
  onAddStage: Nullable<(type: TournamentStageType, index: number) => void>;
  onEditStage?: Nullable<(stage: TournamentStage) => void>;
  onUpdateStages?: Nullable<(stages: TournamentStage[]) => void>;
  stages: TournamentStage[];
}) {
  const [viewingStage, setViewingStage] = useState(null);

  const [draggingStage, setDraggingStage] = useState<TournamentStage | null>(
    null
  );
  function clickStage(stage: TournamentStage) {
    console.log("click stage: ", stage);
    if (!onEditStage) return;
    onEditStage(stage);
    // setViewingStage(stage);
  }
  function sortStages(stagesToSort: TournamentStage[]) {
    return [...stagesToSort].map((stage, i) => ({
      ...stage,
      order: i + 1,
    }));
  }

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 500,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
      activationConstraint: {
        delay: 500,
      },
    })
  );

  function getEditedStageById(id: string) {
    if (!stages?.length) return null;
    return stages.find((s) => s.id === id) || null;
  }

  const [willDelete, setWillDelete] = useState(false);

  const [editedStages, setEditedStages] = useState(stages);

  function onDragOver(args) {
    const { over, active } = args;
    if (!over?.id || !active?.id) return;
    if (over.id === "DELETE") {
      setWillDelete(true);
    } else {
      setWillDelete(false);
    }
    if (over.id === active.id) return;
    const newStages = getNewOrder(active, over);
    setEditedStages(newStages);
    console.log(args);
  }
  function onDragStart(data) {
    const { active } = data;
    if (!active?.id) return;
    setEditedStages(stages);
    const activeStage = getEditedStageById(active.id);
    setDraggingStage(activeStage);
  }

  function onDeleteStage(stageId: string) {
    if (!onUpdateStages) return;
    const newStages = [...stages].filter(({ id }) => id !== stageId);
    const sorted = sortStages(newStages);
    console.log("on delete sorted: ", sorted);
    onUpdateStages(sorted);
  }

  function getNewOrder(active, over) {
    const oldIndex = stages.findIndex(({ id }) => id === active.id);
    const newIndex = stages.findIndex(({ id }) => id === over.id);

    const newStages = arrayMove(stages, oldIndex, newIndex);
    const sorted = sortStages(newStages);
    return sorted;
  }

  function onDragEnd(event) {
    if (!onUpdateStages) return;
    setDraggingStage(null);
    const { active, over } = event;
    if (!over?.id || !active?.id) return;
    if (over?.id && over.id === "DELETE") {
      onDeleteStage(active.id);
      return;
    }
    if (active.id !== over.id) {
      const newStages = getNewOrder(active, over);
      onUpdateStages(newStages);
    }
  }

  return (
    <div>
      {viewingStage && (
        <StageDetailsPopup
          stage={viewingStage}
          onClose={() => setViewingStage(null)}
        />
      )}

      <div className="flex  w-screen  flex-wrap ">
        {children}
        <DndContext
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
          onDragOver={onDragOver}
          sensors={sensors}
          collisionDetection={closestCenter}
        >
          <SortableContext items={stages} strategy={rectSwappingStrategy}>
            <DragOverlay>
              {draggingStage?.id && (
                <TournamentStageListItem
                  stage={draggingStage}
                  detached={true}
                />
              )}
            </DragOverlay>
            {stages.map((s, i) => {
              return (
                <div key={s.id}>
                  <SortableItem id={s.id} disabled={!onUpdateStages}>
                    <TournamentStageListItem
                      stage={s}
                      onClick={() => clickStage(s)}
                      hoverable={true}
                      invisible={
                        !!draggingStage?.id && draggingStage?.id === s.id
                      }
                    >
                      {!!onAddStage && (
                        <StageList2Add
                          onAddStage={(type: TournamentStageType) =>
                            onAddStage(type, i)
                          }
                        />
                      )}
                    </TournamentStageListItem>
                  </SortableItem>
                </div>
              );
            })}
          </SortableContext>
          {onAddStage && (
            <StageList2Add
              alwaysShow={!stages?.length}
              showText={!stages.length}
              onAddStage={(type: TournamentStageType) =>
                onAddStage(type, stages.length)
              }
            />
          )}
          {!!draggingStage?.id && (
            <Droppable id="DELETE">
              <TournamentStageListItemContainer
                destructive={willDelete}
                animated={false}
              >
                <div className="p-6 pl-6 text-white relative z-10 flex items-center justify-center min-w-[200px]">
                  <FaTrashAlt className="text-red-500 text-[2rem]" />
                </div>
              </TournamentStageListItemContainer>
            </Droppable>
          )}
        </DndContext>
      </div>
    </div>
  );
}
