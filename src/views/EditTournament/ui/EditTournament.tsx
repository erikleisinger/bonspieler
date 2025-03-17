"use client";
import { useState } from "react";
import { TournamentStageType, TournamentStage } from "@/entities/Tournament";
import { TournamentEditor } from "@/widgets/TournamentEditor";
import { BracketEditor } from "@/widgets/BracketEditor";
import { BracketEvent } from "@/entities/Bracket";
import { saveTournament } from "../lib";
import { getTournamentContextForStage } from "@/shared/Tournament/getTournamentContextForStage";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import {
  getCurrentTournament,
  updateTournamentStages,
} from "@/entities/Tournament";
export default function EditTournament() {
  const dispatch = useAppDispatch();
  const tournament = useAppSelector(getCurrentTournament);
  const stages = tournament?.stages || [];
  const tournamentId = tournament?.id || null;

  const [editedStage, setEditedStage] = useState<TournamentStage | null>(null);

  function onEditStage(stage: TournamentStage) {
    setEditedStage(stage);
  }

  const isBracket = editedStage?.type === TournamentStageType.Bracket;

  function updateBracketName(newName: string) {
    const { order } = editedStage;
    const newStages = [...stages];
    newStages.splice(order, 1, {
      ...editedStage,
      name: newName,
    });
    dispatch(updateTournamentStages(newStages));
  }

  async function saveBracketEvent(savedEvent: BracketEvent) {
    const { id, order, type, name } = editedStage;

    const newStages = [...stages];
    newStages.splice(order, 1, {
      ...savedEvent,
      order,
      id,
      type,
      name,
    });

    dispatch(updateTournamentStages(newStages));
    await handleSaveTournament();
  }

  function discardChanges() {
    setEditedStage(null);
  }

  const [saving, setSaving] = useState(false);
  async function handleSaveTournament() {
    setSaving(true);
    console.log("tournament to save: ", tournament);
    await saveTournament(tournament);
    setSaving(false);
  }

  return (
    <div className="fixed inset-0 overflow-auto  bg-center bg-gradient">
      {!editedStage && (
        <TournamentEditor
          onEditStage={onEditStage}
          saveTournament={handleSaveTournament}
        />
      )}
      {editedStage && isBracket && (
        <BracketEditor
          data={editedStage}
          onSave={saveBracketEvent}
          onBack={discardChanges}
          updateBracketName={updateBracketName}
          tournamentContext={getTournamentContextForStage(
            editedStage,
            stages,
            tournamentId
          )}
        />
      )}
    </div>
  );
}
