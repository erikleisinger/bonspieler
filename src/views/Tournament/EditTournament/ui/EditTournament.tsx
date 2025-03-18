"use client";
import { useState } from "react";
import { TournamentStageType, TournamentStage } from "@/entities/Tournament";
import { TournamentEditor } from "@/widgets/Tournament/TournamentEditor";
import { BracketEvent } from "@/entities/Bracket";
import { saveTournament } from "../lib";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import {
  getCurrentTournament,
  updateTournamentStages,
} from "@/entities/Tournament";
import EditingBracket from "./EditingBracket";
import { setBracketEvent, resetBracketEvent } from "@/entities/BracketEvent";
export default function EditTournament() {
  const dispatch = useAppDispatch();
  const tournament = useAppSelector(getCurrentTournament);

  const [editedStageType, setEditedStageType] =
    useState<TournamentStageType | null>(null);

  function onEditStage(stage: TournamentStage) {
    if (stage.type === TournamentStageType.Bracket) {
      dispatch(setBracketEvent(stage));
      setEditedStageType(TournamentStageType.Bracket);
    }
  }

  const isBracket = editedStageType === TournamentStageType.Bracket;

  function discardChanges() {
    if (editedStageType === TournamentStageType.Bracket) {
      dispatch(resetBracketEvent());
    }

    setEditedStageType(null);
  }

  const [saving, setSaving] = useState(false);
  async function handleSaveTournament() {
    setSaving(true);
    await saveTournament(tournament);
    setSaving(false);
  }

  return (
    <div className="fixed inset-0 overflow-auto  bg-center bg-gradient">
      {!editedStageType && (
        <TournamentEditor
          onEditStage={onEditStage}
          saveTournament={handleSaveTournament}
        />
      )}
      {editedStageType && isBracket && (
        <EditingBracket onEndView={discardChanges} />
      )}
    </div>
  );
}
