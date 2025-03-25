import {
  TournamentStageType,
  type TournamentStage,
} from "@/entities/Tournament";
import { cn } from "@/lib/utils";
import { StageTypeIcon } from "@/shared/ui/Stage";
import Typography from "@/shared/ui/typography";
import { MdOutlineGroup } from "react-icons/md";
export default function TournamentStageListItemContent({
  className,
  stage,
}: {
  className?: string;
  stage: TournamentStage;
}) {
  function letterClass() {
    if (stage.type === TournamentStageType.Bracket) return "number-text purple";
    if (stage.type === TournamentStageType.Pool) return "number-text emerald";
    if (stage.type === TournamentStageType.Points) return "number-text pink";
    return "";
  }

  function iconClass() {
    if (stage.type === TournamentStageType.Bracket) return "text-blue-500";
    if (stage.type === TournamentStageType.Pool) return "text-emerald-500";
    if (stage.type === TournamentStageType.Points) return "text-pink-500";
    return "";
  }
  return (
    <div
      className={cn(
        "relative group  transition-all rounded-lg  p-6  min-w-[250px] max-w-[350px]   z-[1]  h-fit",
        className
      )}
    >
      <div className="absolute top-0 bottom-0 right-6 m-auto h-fit">
        <StageTypeIcon
          type={stage.type}
          className={cn("text-[5rem]  opacity-[0.1]", iconClass())}
        />
      </div>
      <div className="flex gap-2 items-end">
        <Typography
          tag="h2"
          className={cn(
            " text-[3.5rem] leading-[1] font-black  drop-shadow-lg pl-2",
            letterClass()
          )}
        >
          {stage.order.toString().padStart(2, "0")}
        </Typography>
      </div>

      <div className="grid grid-cols-[auto,1fr] gap-2 ">
        <div className="pt-1"></div>
        <div className="overflow-hidden">
          <Typography tag="h3" className="text-slate-600 ">
            {stage.name}
          </Typography>

          <div className="flex gap-2 mt-2">
            <div className="flex gap-1 items-center  flex-wrap">
              <MdOutlineGroup />
              <span className="text-sm">{stage.num_start_teams || 0}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
