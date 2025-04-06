import { TournamentStageType } from "@/entities/Tournament";

export function getModalStyle({ type }: { type: TournamentStageType }) {
  return {
    [TournamentStageType.Bracket]: "text-bracket-primary",
    [TournamentStageType.Pool]: "text-pool-primary",
    [TournamentStageType.Points]: "text-points-primary",
  }[type];
}
