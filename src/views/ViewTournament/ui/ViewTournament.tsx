"use client";
import { useState } from "react";
import { TournamentStageType, TournamentStage } from "@/entities/Tournament";
import { TournamentViewer } from "@/widgets/TournamentViewer";

import ViewingBracket from "./ViewingBracket";
export default function TournamentView() {
  const [viewingStage, setViewingStage] = useState<TournamentStage | null>(
    null
  );

  const isBracket = viewingStage?.type === TournamentStageType.Bracket;

  function onBack() {
    setViewingStage(null);
  }

  return (
    <div className="fixed inset-0 overflow-auto bg-gradient  bg-center">
      {!viewingStage && <TournamentViewer onViewStage={setViewingStage} />}
      {viewingStage && isBracket && (
        <ViewingBracket bracketStage={viewingStage} onEndView={onBack} />
      )}
    </div>
  );
}
