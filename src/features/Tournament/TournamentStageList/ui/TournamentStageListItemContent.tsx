import {
  TournamentStageType,
  type TournamentStage,
} from "@/entities/Tournament";
import { cn } from "@/lib/utils";
import { StageTypeIcon } from "@/shared/ui/Stage";
import Typography from "@/shared/ui/typography";

import { FaFlagCheckered } from "react-icons/fa6";
import { FaCalendarAlt } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";
export default function TournamentStageListItemContent({
  className,
  dense = false,
  hideText = false,
  nameChildren,
  numberChildren,
  stage,
}: {
  className?: string;
  dense?: boolean;
  hideText?: boolean;
  nameChildren?: React.ReactNode;
  numberChildren?: React.ReactNode;
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
        "relative group/stagelistitemcontent  transition-all rounded-lg  p-6     z-[1]  h-fit",
        !dense && "min-w-[250px] max-w-[350px]",
        className
      )}
    >
      {!dense && (
        <div className="absolute top-0 bottom-0 right-6 m-auto h-fit">
          <StageTypeIcon
            type={stage.type}
            className={cn("text-[5rem]  opacity-[0.1]", iconClass())}
          />
        </div>
      )}

      <div className="flex gap-2 items-center">
        <Typography
          tag="h2"
          className={cn(
            " font-black  drop-shadow-lg pl-2",
            dense
              ? "text-[1.5rem] group-hover/stagelistitemcontent:text-[2rem] transition-all"
              : "text-[3.5rem]  leading-[1]",
            letterClass()
          )}
        >
          {stage.order.toString().padStart(2, "0")}
        </Typography>
        {numberChildren}
        {dense && (
          <Typography
            tag="p"
            className={cn(
              hideText &&
                "scale-x-0 group-hover/stagelistitemcontent:scale-x-100 transition-transform origin-left"
            )}
          >
            {stage.name}
          </Typography>
        )}
      </div>
      {!dense && (
        <div className="grid grid-cols-[auto,1fr] gap-2 ">
          <div className="pt-1"></div>
          <div className="overflow-hidden">
            <div className="flex items-center gap-2">
              {nameChildren ? (
                nameChildren
              ) : (
                <Typography tag="h3" className="text-slate-600 ">
                  {stage.name}
                </Typography>
              )}
            </div>

            <div className="flex gap-4 mt-2">
              <div className="flex gap-1 items-center  flex-wrap">
                <FaUserGroup className="text-sm" />
                <span className="text-sm">{stage.num_start_teams || 0}</span>
              </div>
              <div className="flex gap-1 items-center  flex-wrap">
                <FaFlagCheckered className="text-sm" />
                <span className="text-sm">{stage.num_end_teams || 0}</span>
              </div>
              <div className="flex gap-1 items-center  flex-wrap">
                <FaCalendarAlt className="text-sm" />
                <span className="text-sm">0</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
