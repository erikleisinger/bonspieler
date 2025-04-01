import { useState, useMemo, useEffect } from "react";
import { type TournamentStage } from "@/entities/Tournament";

import type { StageViewerPriority } from "../types/StageViewerPriority";

export default function useTournamentStageViewerState({
  editable = false,
}: {
  editable: boolean;
}) {
  const [selectedStage, setSelectedStage] = useState<TournamentStage>(null);
  const [editedStage, setEditedStage] = useState<TournamentStage>(null);
  const [viewingPriority, setViewingPriority] =
    useState<StageViewerPriority>("editing");

  const canEdit = useMemo(() => {
    if (!editable) return false;
    return editable && !!editedStage?.id;
  }, [editedStage?.id, editable]);

  function editStage(stage: TournamentStage) {
    setEditedStage(stage);
    setViewingPriority("editing");
  }

  function selectStage(stage: TournamentStage) {
    setSelectedStage(stage);
    if (stage.id === editedStage?.id) {
      setViewingPriority("editing");
    } else {
      setViewingPriority("viewing");
    }
  }

  function resetState() {
    setSelectedStage(null);
    setEditedStage(null);
    setViewingPriority("viewing");
  }

  const whatToShow = useMemo(() => {
    if (!editable) return selectedStage?.id ? "view" : null;
    if (!editedStage?.id && !selectedStage?.id) return null;
    if (viewingPriority === "editing") {
      if (!editedStage?.id) return "view";
      return "edit";
    } else {
      return "view";
    }
  }, [selectedStage?.id, editedStage?.id, viewingPriority, editable]);

  if (editable) {
    return {
      canEdit,
      editStage,
      editedStage,
      selectStage,
      selectedStage,
      resetState,
      whatToShow,
    };
  } else {
    return {
      canEdit: false,
      editStage: () => {},
      selectStage,
      selectedStage,
      resetState,
      whatToShow,
    };
  }
}
