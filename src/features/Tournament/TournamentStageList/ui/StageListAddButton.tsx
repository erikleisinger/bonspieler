import { TournamentStageType } from "@/entities/Tournament";
import { StageTypeIcon } from "@/shared/ui/Stage";
import { cn } from "@/lib/utils";
import Typography from "@/shared/ui/typography";
export default function StageListAddButton({
  onAdd,
  showText,
  type,
}: {
  onAdd: () => void;
  showText?: boolean;
  type: TournamentStageType;
}) {
  function styleDefs() {
    if (showText)
      return {
        width: "auto",
      };
    return {};
  }
  return (
    <div
      className={cn(
        "py-2 text-indigo-500 hover:text-white bg-transparent hover:bg-indigo-500  overflow-hidden transition-all h-full flex items-center justify-center",
        showText ? "px-4" : ""
      )}
      onClick={onAdd}
      style={styleDefs()}
    >
      <StageTypeIcon type={type} className="text-[2rem]   skew-x-[20deg]" />
      {showText && (
        <Typography tag="p" className="ml-2 skew-x-[20deg]">
          Add {type} stage
        </Typography>
      )}
    </div>
  );
}
