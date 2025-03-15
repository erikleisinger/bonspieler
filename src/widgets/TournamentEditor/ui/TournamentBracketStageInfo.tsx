import type { TournamentBracketStage } from "../lib/types/TournamentStage";
import { BracketEventInfo } from "@/entities/BracketEvent";
export default function TournamentBracketStageInfo({
  bracketStage,
}: {
  bracketStage: TournamentBracketStage;
}) {
  return (
    <div>
      <BracketEventInfo
        schedule={bracketStage.schedule}
        connections={bracketStage.connections}
        brackets={bracketStage.brackets}
        winners={bracketStage.numWinners}
      />
    </div>
  );
}
