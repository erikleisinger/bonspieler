import { FormatCard } from "@/modules/tournament-stage-manager/shared";
import { PoolFormat } from "@/modules/tournament-stage-manager/widgets/tournament-stage-wizard/types";
export default function PoolFormatCard({
  selected,
  setValue,
  type,
}: {
  selected: boolean;
  setValue: (value: number) => void;
  type: PoolFormat;
}) {
  const title = {
    RoundRobin: "Round Robin",
    Swiss: "Swiss",
    Random: "Random",
  }[type];

  const description = {
    RoundRobin: "Everyone plays each other once.",
    Swiss: "Teams are matched based on previous results.",
    Random: "Teams are randomly matched.",
  }[type];

  const subtitle = {
    RoundRobin: "Format",
    Swiss: "Style",
    Random: "",
  }[type];

  return (
    <FormatCard
      onClick={() => {}}
      title={title}
      description={description}
      subtitle={subtitle}
      selected={selected}
    />
  );
}
