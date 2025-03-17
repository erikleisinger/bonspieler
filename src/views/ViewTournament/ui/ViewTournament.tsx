"use client";
import { useState } from "react";
import { TournamentStageType, TournamentStage } from "@/entities/Tournament";
import { TournamentViewer } from "@/widgets/TournamentViewer";
import { type BracketRows } from "@/entities/Bracket";
import { getTournamentContextForStage } from "@/shared/Tournament/getTournamentContextForStage";

import { useAppSelector } from "@/lib/store";
import { getCurrentTournament } from "@/entities/Tournament";
import { BracketViewer } from "@/widgets/BracketViewer";
export default function TournamentView() {
  const tournament = useAppSelector(getCurrentTournament);
  const tournamentId = tournament?.id;
  const stages = tournament?.stages || [];

  const [viewingStage, setViewingStage] = useState<TournamentStage | null>(
    null
  );

  const isBracket = viewingStage?.type === TournamentStageType.Bracket;

  function onBack() {
    setViewingStage(null);
  }

  const tournamentContext = getTournamentContextForStage(
    viewingStage,
    stages,
    tournamentId
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
    <div className="fixed inset-0 overflow-auto bg-gradient  bg-center">
      {!viewingStage && <TournamentViewer onViewStage={setViewingStage} />}
      {viewingStage && isBracket && (
        <div className="fixed inset-0">
          <BracketViewer stage={viewingStage} onBack={onBack}></BracketViewer>
        </div>
      )}
    </div>
  );
}
