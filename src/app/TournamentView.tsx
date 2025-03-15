"use client";
import "./gradient.css";
import { useState } from "react";
import { TournamentStageType, TournamentStage } from "@/entities/Tournament";
import { TournamentViewer } from "@/widgets/TournamentViewer";
import { Brackets, type BracketRows } from "@/entities/Bracket";
import { getTotalBracketWinners } from "@/shared/Bracket/getTotalBracketWinners";
import { StageTournamentContext } from "@/shared/types/StageTournamentContext";
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
  const tournamentClone = JSON.parse(JSON.stringify(tournament));

  const [viewingStage, setViewingStage] = useState<TournamentStage | null>(
    null
  );

  const isBracket = viewingStage?.type === TournamentStageType.Bracket;

  function onBack() {
    setViewingStage(null);
  }

  function getTournamentContextForStage(
    stage: TournamentStage | null
  ): StageTournamentContext {
    if (!stage)
      return {
        order: 0,
        startTeams: 0,
        endTeams: 0,
        prevStageName: null,
        nextStageName: null,
      };
    const { order } = stage;
    let startTeams = null;
    let endTeams = null;
    let prevStageName = null;
    let nextStageName = null;
    if (order !== 0) {
      const lastStage = tournamentClone.stages[order - 1];
      const { numWinners, name } = lastStage || {};
      startTeams = getTotalBracketWinners(numWinners);
      prevStageName = name;
    }

    if (
      order !== tournamentClone.stages.length - 1 &&
      !!tournamentClone.stages[order + 1]
    ) {
      const nextStage = tournamentClone.stages[order + 1];
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

  const tournamentContext = getTournamentContextForStage(viewingStage);

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
          stages={tournamentClone?.stages || []}
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
