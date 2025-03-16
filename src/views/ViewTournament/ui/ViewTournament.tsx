"use client";
import { useState } from "react";
import { TournamentStageType, TournamentStage } from "@/entities/Tournament";
import { TournamentViewer } from "@/widgets/TournamentViewer";
import { Brackets, type BracketRows } from "@/entities/Bracket";
import { getTournamentContextForStage } from "@/shared/Tournament/getTournamentContextForStage";
import type { Tournament } from "@/shared/types/Tournament";
import { generateUUID } from "@/shared/utils/generateUUID";
import { Button } from "@/shared/ui/button";
import { FaArrowLeft } from "react-icons/fa";
export default function TournamentView({
  tournament = {
    id: generateUUID(),
    name: "New Bonspiel",
    stages: [],
  },
}: {
  tournament?: Tournament;
}) {
  const tournamentClone: Tournament = JSON.parse(JSON.stringify(tournament));

  const [viewingStage, setViewingStage] = useState<TournamentStage | null>(
    null
  );

  const isBracket = viewingStage?.type === TournamentStageType.Bracket;

  function onBack() {
    setViewingStage(null);
  }

  const tournamentContext = getTournamentContextForStage(
    viewingStage,
    tournamentClone
  );

  const [rows, setRows] = useState({});

  function updateRows(newRows: BracketRows) {
    setRows((prevRows) => {
      return {
        ...prevRows,
        ...newRows,
      };
    });
  }

  return (
    <div className="fixed inset-0 overflow-auto gradient-background  bg-center">
      {!viewingStage && (
        <TournamentViewer
          tournament={tournamentClone}
          onViewStage={setViewingStage}
        />
      )}
      {viewingStage && isBracket && (
        <div className="fixed inset-0">
          <Brackets
            brackets={viewingStage.brackets}
            connections={viewingStage.connections}
            drawTimes={viewingStage.drawTimes}
            eventName={viewingStage.name}
            readableIdIndex={viewingStage.readableIdIndex}
            schedule={viewingStage.schedule}
            rows={rows}
            updateRows={updateRows}
            nextStageName={tournamentContext.nextStageName}
            backButton={
              <Button size="icon" variant="ghost" onClick={onBack}>
                <FaArrowLeft />
              </Button>
            }
          />
        </div>
      )}
    </div>
  );
}
