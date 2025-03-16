import {
  TournamentStageType,
  type TournamentStage,
} from "@/entities/Tournament";
import { StageTournamentContext } from "@/shared/types/StageTournamentContext";
import { getTotalBracketWinners } from "@/shared/Bracket/getTotalBracketWinners";
import { Tournament } from "../types/Tournament";

/**
 *
 * @returns required information about a tournament that is needed by our
 * BracketEditor / Brackets components to render.
 */
function getTournamentContextForBracketStage(
  stage: TournamentStage,
  tournament: Tournament
): StageTournamentContext {
  const { order } = stage;
  let startTeams = null;
  let endTeams = null;
  let prevStageName = null;
  let nextStageName = null;
  if (order !== 0) {
    const lastStage = tournament.stages[order - 1];
    const { numWinners, name } = lastStage || {};
    startTeams = getTotalBracketWinners(numWinners);
    prevStageName = name;
  }

  if (
    order !== tournament.stages.length - 1 &&
    !!tournament.stages[order + 1]
  ) {
    const nextStage = tournament.stages[order + 1];
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

export function getTournamentContextForStage(
  stage: TournamentStage | null,
  tournament: Tournament
): StageTournamentContext {
  if (!stage?.type) {
    console.warn("could not get context for stage - type is not defined");
    return {
      order: 0,
      startTeams: 0,
      endTeams: 0,
      prevStageName: null,
      nextStageName: null,
    };
  }
  if (stage.type === TournamentStageType.Bracket)
    return getTournamentContextForBracketStage(stage, tournament);

  return {
    order: 0,
    startTeams: 0,
    endTeams: 0,
    prevStageName: null,
    nextStageName: null,
  };
}
