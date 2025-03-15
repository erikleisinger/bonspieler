"use client";
import "./gradient.css";
import { useState } from "react";
import {
  TournamentEditor,
  TournamentStageType,
} from "@/widgets/TournamentEditor";
import type { TournamentStage } from "@/widgets/TournamentEditor";
import { BracketEditor } from "@/widgets/BracketEditor";
import { BracketEvent } from "@/entities/Bracket";
export default function TournamentView({
  tournament = {
    name: "New Bonspiel",
    stages: [],
  },
}: {
  tournament?: {
    name: string;
    stages: TournamentStage[];
  };
}) {
  const tournamentClone = JSON.parse(JSON.stringify(tournament));
  const [editedTournament, setEditedTournament] = useState(tournamentClone);

  const [editedStage, setEditedStage] = useState<TournamentStage | null>(null);

  function onEditStage(stage: TournamentStage) {
    setEditedStage(stage);
  }
  const isBracket = editedStage?.type === TournamentStageType.Bracket;

  function saveBracketEvent(savedEvent: BracketEvent) {
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
    setEditedStage(null);
  }

  function discardChanges() {
    setEditedStage(null);
  }

  return (
    <div className="fixed inset-0 overflow-auto gradient-background  bg-center">
      {!editedStage && (
        <TournamentEditor
          onEditStage={onEditStage}
          tournament={editedTournament}
        />
      )}
      {editedStage && isBracket && (
        <BracketEditor
          data={editedStage}
          onSave={saveBracketEvent}
          onBack={discardChanges}
        />
      )}
    </div>
  );
}
