import { TournamentStageType } from "@/entities/Tournament";
import { RiSortNumberDesc } from "react-icons/ri";
import { TbTableFilled } from "react-icons/tb";
import { TbTournament } from "react-icons/tb";
export default function StageTypeIcon({
  className,
  type,
}: {
  className?: string;
  type: TournamentStageType;
}) {
  function getIcon() {
    if (type === TournamentStageType.Bracket)
      return <TbTournament></TbTournament>;
    if (type === TournamentStageType.Pool) return <TbTableFilled />;
    if (type === TournamentStageType.Points) return <RiSortNumberDesc />;
    return <div />;
  }
  return <div className={className}>{getIcon()}</div>;
}
