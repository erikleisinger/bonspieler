"use client";
import { useState } from "react";
import { TournamentStageType, TournamentStage } from "@/entities/Tournament";
import { TournamentEditor } from "@/widgets/TournamentEditor";
import { BracketEditor } from "@/widgets/BracketEditor";
import { BracketEvent } from "@/entities/Bracket";
import type { Tournament } from "@/shared/types/Tournament";
import { saveTournament } from "../lib";
import LoaderFullPage from "@/shared/ui/loader-full-page";
import { getTournamentContextForStage } from "@/shared/Tournament/getTournamentContextForStage";
export default function EditTournament({
  tournament = {
    name: "New Bonspiel",
    stages: [],
  },
}: {
  tournament?: Tournament;
}) {
  const tournamentClone = JSON.parse(JSON.stringify(tournament));
  const [editedTournament, setEditedTournament] =
    useState<Tournament>(tournamentClone);

  const [editedStage, setEditedStage] = useState<TournamentStage | null>(null);

  function onEditStage(stage: TournamentStage) {
    setEditedStage(stage);
  }

  const isBracket = editedStage?.type === TournamentStageType.Bracket;

  async function saveBracketEvent(savedEvent: BracketEvent) {
    const { id, order, type } = editedStage;

    const newStages = [...editedTournament.stages];
    newStages.splice(order, 1, {
      ...savedEvent,
      order,
      id,
      type,
    });

    const newTournament = { ...editedTournament, stages: newStages };

    setEditedTournament(newTournament);
    await handleSaveTournament(newTournament);
  }

  function discardChanges() {
    setEditedStage(null);
  }

  const [saving, setSaving] = useState(false);
  async function handleSaveTournament(tournamentToSave: Tournament) {
    setSaving(true);
    await saveTournament(tournamentToSave);
    setSaving(false);
  }

  return (
    <div className="fixed inset-0 overflow-auto  bg-center bg-gradient">
      {saving && <LoaderFullPage />}

      {!editedStage && (
        <TournamentEditor
          onEditStage={onEditStage}
          saveTournament={handleSaveTournament}
          tournament={editedTournament}
        />
      )}
      {editedStage && isBracket && (
        <BracketEditor
          data={editedStage}
          onSave={saveBracketEvent}
          onBack={discardChanges}
          tournamentContext={getTournamentContextForStage(
            editedStage,
            editedTournament
          )}
        />
      )}
    </div>
  );
}
