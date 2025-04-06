import { FormatCard } from "@/modules/tournament-stage-wizard/shared/ui";
import { PoolFormat } from "@/modules/tournament-stage-wizard/shared/types";
import { getStageCardStyle } from "@/modules/tournament-stage-wizard/shared/lib";
import { TournamentStageType } from "@/entities/Tournament";
export default function PoolFormatCard({
  selected,
  onClick,
  type,
}: {
  selected: boolean;
  onClick: () => void;
  type: PoolFormat;
}) {
  const title = {
    RoundRobin: "Round Robin",
    Monrad: "Monrad ",
    Random: "Random",
    Dutch: "Dutch",
  }[type];

  const description = {
    RoundRobin: "Everyone plays each other once.",
    Monrad: "Teams are matched evenly based on past results.",
    Dutch: "Higher ranked teams are matched with lower ranked teams.",
    Random: "Teams are matched randomly.",
  }[type];

  const subtitle = {
    RoundRobin: "Format",
    Monrad: "Style",
    Dutch: "Style",
    Random: "",
  }[type];

  return (
    <FormatCard
      onClick={onClick}
      title={title}
      description={description}
      subtitle={subtitle}
      selected={selected}
    />
  );
}
