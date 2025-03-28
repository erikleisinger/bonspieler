import { TournamentStageType } from "@/entities/Tournament";
import { cn } from "@/lib/utils";
export default function TournamentStageListItemContainer({
  active,
  animated = true,
  blur,
  children,
  className,
  destructive,
  detached,
  successful,
  onClick,
  stageType,
}: {
  active?: boolean;
  animated?: boolean;
  blur?: boolean;
  children: React.ReactNode;
  className?: string;
  destructive?: boolean;
  detached?: boolean;
  successful?: boolean;
  onClick?: () => void;
  stageType: TournamentStageType;
}) {
  function handleClick() {
    if (!onClick) return;
    onClick();
  }

  function hoverClass() {
    if (stageType === TournamentStageType.Bracket) {
      return "group-hover:bg-blue-500/10";
    }
    if (stageType === TournamentStageType.Pool) {
      return "group-hover:bg-emerald-500/10";
    }
    if (stageType === TournamentStageType.Points) {
      return "group-hover:bg-pink-500/10";
    }
  }

  return (
    <div
      className={cn(
        "flex  relative group px-2   transition-all duration-300   h-full min-h-[160px] ",
        animated && "stage_card--animated",
        onClick && "cursor-pointer"
      )}
      onClick={handleClick}
    >
      <div
        className={cn(
          "absolute inset-0  transition-all skew-x-[-20deg]  duration-200   backdrop-blur-sm",
          active && hoverClass(),
          destructive && "bg-red-500/50",
          detached && "shadow-md",
          detached && hoverClass(),
          successful && "group-hover:bg-emerald-500/20",
          blur && "backdrop-blur-sm",
          className
        )}
      />
      <div
        className={cn(
          "absolute top-0 bottom-0 right-0 w-[1px] shadow-xl big-shadow   transition-all skew-x-[-20deg] h-[80%] m-auto    duration-500  ",
          className
        )}
      />
      {children}
    </div>
  );
}
