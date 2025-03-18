import { TournamentStage, TournamentStageType } from "../../types";
import type { BracketEvent } from "@/entities/Bracket";
import { ViewableBracketEvent } from "@/entities/BracketEvent";
function formatBracketStage(bracketStage: ViewableBracketEvent): BracketEvent {
  const {
    brackets,
    connections,
    drawTimes,
    id,
    name,
    numSheets,
    numTeams,
    numWinners,
    readableIdIndex,
    schedule,
    order,
  } = bracketStage;
  return {
    brackets,
    connections,
    drawTimes,
    id,
    order,
    name,
    numSheets,
    numTeams,
    numWinners,
    readableIdIndex,
    schedule,
    type: TournamentStageType.Bracket,
  };
}

export function formatTournamentStage(stage: TournamentStage) {
  const { type } = stage;
  if (type === TournamentStageType.Bracket) {
    return formatBracketStage(stage);
  }
}
