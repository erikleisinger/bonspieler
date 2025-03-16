"use client";
import "./gradient.css";
import { useState } from "react";
import { TournamentStageType, TournamentStage } from "@/entities/Tournament";
import { TournamentEditor } from "@/widgets/TournamentEditor";
import { BracketEditor } from "@/widgets/BracketEditor";
import { BracketEvent } from "@/entities/Bracket";
import { getTotalBracketWinners } from "@/shared/Bracket/getTotalBracketWinners";
import { StageTournamentContext } from "@/shared/types/StageTournamentContext";
import type { Tournament } from "@/shared/types/Tournament";
import { api } from "@/shared/api";
import { addTournament, updateTournament } from "@/widgets/TournamentEditor";
export default function TournamentEdit({
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

  function saveTournament(newTournament: Tournament) {
    const { id, stages, name } = newTournament;

    if (!id) {
      addTournament({
        name,
        schema: JSON.stringify({
          stages,
        }),
      });
    } else {
      updateTournament({
        id,
        updates: {
          schema: JSON.stringify({
            stages,
          }),
        },
      });
    }
  }

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
    saveTournament(newTournament);
  }

  function discardChanges() {
    setEditedStage(null);
  }

  function getTournamentContextForStage(
    stage: TournamentStage
  ): StageTournamentContext {
    const { order } = stage;
    let startTeams = null;
    let endTeams = null;
    let prevStageName = null;
    let nextStageName = null;
    if (order !== 0) {
      const lastStage = editedTournament.stages[order - 1];
      const { numWinners, name } = lastStage || {};
      startTeams = getTotalBracketWinners(numWinners);
      prevStageName = name;
    }

    if (
      order !== editedTournament.stages.length - 1 &&
      !!editedTournament.stages[order + 1]
    ) {
      const nextStage = editedTournament.stages[order + 1];
      const { name, numTeams } = nextStage;
      endTeams = numTeams;
      nextStageName = name;
    }

    return {
      order,
      startTeams,
      endTeams,
      prevStageName,
      nextStageName,
    };
  }

  return (
    <div className="fixed inset-0 overflow-auto gradient-background  bg-center">
      {!editedStage && (
        <TournamentEditor
          onEditStage={onEditStage}
          updateTournament={setEditedTournament}
          saveTournament={saveTournament}
          tournament={editedTournament}
        />
      )}
      {editedStage && isBracket && (
        <BracketEditor
          data={editedStage}
          onSave={saveBracketEvent}
          onBack={discardChanges}
          tournamentContext={getTournamentContextForStage(editedStage)}
        />
      )}
    </div>
  );
}
