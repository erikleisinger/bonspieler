import { TournamentStageType } from "@/entities/Tournament";
import { cn } from "@/lib/utils";
export function getStageCardStyle({
  selected,
  type,
}: {
  selected: boolean;
  type: TournamentStageType;
}) {
  const className = {
    [TournamentStageType.Bracket]: cn(
      "border-l-bracket-muted hover:border-l-bracket-primary   hover:text-bracket-primary",
      selected &&
        "bg-bracket-primary border-l-bracket-muted text-bracket-primary-foreground hover:text-bracket-primary-foreground hover:border-l-bracket-muted"
    ),
    [TournamentStageType.Pool]: cn(
      "border-l-pool-muted hover:border-l-pool-primary    hover:text-pool-primary",
      selected &&
        "bg-pool-primary border-l-pool-muted text-pool-primary-foreground hover:text-pool-primary-foreground hover:border-l-pool-muted"
    ),
    [TournamentStageType.Points]: cn(
      "border-l-points-muted hover:border-l-points-muted hover:bg-points-primary hover:text-points-primary-foreground",
      selected && "bg-points-primary text-points-primary-foreground"
    ),
  }[type];

  return className;
}
