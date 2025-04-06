import { TbTableFilled, TbTournament } from "react-icons/tb";
import Typography from "@/shared/ui/typography";
import { TournamentStageType } from "@/entities/Tournament";
import { RiSortNumberDesc } from "react-icons/ri";
import { cn } from "@/lib/utils";
export default function StageTypeCard({
  onClick,
  selected,
  type,
}: {
  onClick?: () => void;
  selected: boolean;
  type: TournamentStageType;
}) {
  const style = {
    height: "4rem",
    width: "4rem",
  };

  const icon = {
    [TournamentStageType.Bracket]: <TbTournament style={style} />,
    [TournamentStageType.Pool]: <TbTableFilled style={style} />,
    [TournamentStageType.Points]: <RiSortNumberDesc style={style} />,
  };

  const name = {
    [TournamentStageType.Bracket]: "Bracket",
    [TournamentStageType.Pool]: "Pool",
    [TournamentStageType.Points]: "Points",
  };

  const description = {
    [TournamentStageType.Bracket]:
      "Teams are eliminated once they lose a certain number of games.",
    [TournamentStageType.Pool]:
      "Teams are divided into groups and compete against each other.",
    [TournamentStageType.Points]:
      "Teams play against each other and accumulate points. The team(s) with the most points wins.",
  };

  return (
    <div
      onClick={onClick}
      className={cn(
        "grid grid-cols-[auto_1fr] gap-4  p-4 rounded-xl shadow-md  transition-all border-l-4 border-l-indigo-300",
        selected
          ? "bg-indigo-500 text-white"
          : "hover:bg-indigo-500 hover:text-white",
        onClick && "cursor-pointer"
      )}
    >
      {icon[type]}
      <div>
        <Typography tag="h3">{name[type]}</Typography>
        <Typography tag="p" className="text-sm italic">
          {description[type]}
        </Typography>
      </div>
    </div>
  );
}
