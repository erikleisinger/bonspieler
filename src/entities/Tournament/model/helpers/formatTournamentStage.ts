import {
  TournamentBracketStage,
  TournamentStage,
  TournamentStageType,
  ViewableTournamentBracketStage,
  ViewableTournamentStage,
} from "../../types";

function formatBracketStageForSave(
  bracketStage: ViewableTournamentBracketStage
): TournamentBracketStage {
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

export function formatTournamentStageForSave(
  stage: ViewableTournamentStage
): TournamentStage {
  const { type } = stage;
  if (type === TournamentStageType.Bracket) {
    return formatBracketStageForSave(stage);
  }
}
