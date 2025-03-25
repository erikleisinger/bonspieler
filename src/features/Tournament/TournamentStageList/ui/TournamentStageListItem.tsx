import type { TournamentStage } from "@/entities/Tournament";
import { cn } from "@/lib/utils";
import TournamentStageListItemContainer from "./TournamentStageListItemContainer";
import TournamentStageListItemContent from "./TournamentStageListItemContent";
export default function TournamentStageListItem({
  children,
  className,
  detached,
  hoverable,
  invisible,
  onClick,
  stage,
}: {
  children: React.ReactNode;
  className?: string;
  detached?: boolean;
  hoverable?: boolean;
  invisible?: boolean;
  onClick: () => void;
  stage: TournamentStage;
}) {
  return (
    <div
      className={cn("flex relative  ", className)}
      style={{
        visibility: invisible ? "hidden" : "visible",
      }}
      key={stage.id}
    >
      {children}
      <TournamentStageListItemContainer
        onClick={onClick}
        active={hoverable}
        detached={detached}
        stageType={stage.type}
      >
        <TournamentStageListItemContent stage={stage} className="pl-10" />
      </TournamentStageListItemContainer>
    </div>
  );
}
