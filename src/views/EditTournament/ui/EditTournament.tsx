"use client";
import { useState, useContext } from "react";
import { TournamentStageType, TournamentStage } from "@/entities/Tournament";
import { TournamentEditor } from "@/widgets/TournamentEditor";
import { BracketEditor } from "@/widgets/BracketEditor";
import { BracketEvent } from "@/entities/Bracket";
import type { Tournament } from "@/shared/types/Tournament";
import { saveTournament } from "../lib";
import { getTournamentContextForStage } from "@/shared/Tournament/getTournamentContextForStage";
import { TournamentContext } from "@/entities/Tournament/lib";
export default function EditTournament() {
  const {
    id: tournamentId,
    name: tournamentName,
    stages,
    updateTournament,
  } = useContext(TournamentContext);

  const [editedStage, setEditedStage] = useState<TournamentStage | null>(null);

  function onEditStage(stage: TournamentStage) {
    setEditedStage(stage);
  }

  const isBracket = editedStage?.type === TournamentStageType.Bracket;

  async function saveBracketEvent(savedEvent: BracketEvent) {
    const { id, order, type } = editedStage;

    const newStages = [...stages];
    newStages.splice(order, 1, {
      ...savedEvent,
      order,
      id,
      type,
    });

    const newTournament = {
      id: tournamentId,
      name: tournamentName,
      stages: newStages,
    };

    updateTournament({
      stages: newStages,
    });
    await handleSaveTournament(newTournament);
  }

  function discardChanges() {
    setEditedStage(null);
  }

  const [saving, setSaving] = useState(false);
  async function handleSaveTournament(tournamentToSave: Tournament) {
    setSaving(true);
    await saveTournament({
      id: tournamentId,
      name: tournamentName,
      stages,
    });
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
