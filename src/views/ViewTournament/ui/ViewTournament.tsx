"use client";
import { useContext, useState } from "react";
import { TournamentStageType, TournamentStage } from "@/entities/Tournament";
import { TournamentViewer } from "@/widgets/TournamentViewer";
import { Brackets, type BracketRows } from "@/entities/Bracket";
import { getTournamentContextForStage } from "@/shared/Tournament/getTournamentContextForStage";
import { Button } from "@/shared/ui/button";
import { FaArrowLeft } from "react-icons/fa";
import { TournamentContext } from "@/entities/Tournament/lib";
export default function TournamentView() {
  const { id: tournamentId, stages } = useContext(TournamentContext);

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
