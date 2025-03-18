"use client";
import { useState } from "react";
import { TournamentStageType, TournamentStage } from "@/entities/Tournament";
import { TournamentViewer } from "@/widgets/Tournament/TournamentViewer";
import { useAppDispatch } from "@/lib/store";
import { setBracketEvent, resetBracketEvent } from "@/entities/BracketEvent";
import ViewingBracket from "./ViewingBracket";
export default function TournamentView() {
  const dispatch = useAppDispatch();

  const [editedStageType, setEditedStageType] =
    useState<TournamentStageType | null>(null);

  function onViewStage(stage: TournamentStage) {
    if (stage.type === TournamentStageType.Bracket) {
      dispatch(setBracketEvent(stage));
      setEditedStageType(TournamentStageType.Bracket);
    }
  }

  const isBracket = editedStageType === TournamentStageType.Bracket;

  function onBack() {
    if (editedStageType === TournamentStageType.Bracket) {
      dispatch(resetBracketEvent());
    }

    setEditedStageType(null);
  }

  return (
    <div className="fixed inset-0 overflow-auto bg-gradient  bg-center">
      {!editedStageType && <TournamentViewer onViewStage={onViewStage} />}
      {editedStageType && isBracket && <ViewingBracket onEndView={onBack} />}
    </div>
  );
}
