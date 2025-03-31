import { TournamentStage } from "@/entities/Tournament";
import { StageTypeIcon } from "@/shared/ui/Stage";
import { FaFlagCheckered } from "react-icons/fa6";
import { FaCalendarAlt, FaPencilAlt } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";
import { cn } from "@/lib/utils";
export default function TournamentStageSidebarItem({
  children,
  onClick,
  selected,
  edited,
  stage,
}: {
  children?: React.ReactNode;
  onClick?: () => void;
  selected: boolean;
  edited: boolean;
  stage: TournamentStage;
}) {
  function handleClick() {
    if (onClick) {
      onClick();
    }
  }
  return (
    <div
      className={cn(
        "grid grid-cols-[auto_1fr_auto] gap-4 group relative ",
        onClick && "cursor-pointer"
      )}
      onClick={handleClick}
    >
      <div
        className={cn(
          "  flex justify-center items-center skew-x-[-10deg] aspect-square transition-all",
          selected && edited
            ? "bg-emerald-500 text-white"
            : selected
            ? "bg-indigo-500 text-white"
            : edited
            ? "bg-glass text-emerald-500 group-hover:bg-emerald-100 group-hover:text-emerald-600"
            : "bg-glass text-indigo-500 group-hover:bg-indigo-100 group-hover:text-indigo-600"
        )}
      >
        <div className="skew-x-[10deg]">
          <StageTypeIcon type={stage.type} />
        </div>
      </div>
      <div className="py-2 relative whitespace-nowrap">
        <div className="font-semibold">{stage.name}</div>
        <div>
          <div className="flex gap-4 ">
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
      {children || <div />}
    </div>
  );
}
