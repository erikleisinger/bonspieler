import { TournamentStageType } from "@/entities/Tournament";
import StageTypeCard from "./StageTypeCard";
import { Nullable } from "@/shared/types";
export default function SelectStageType({
  stageType,
  setStageType,
}: {
  stageType: Nullable<TournamentStageType>;
  setStageType: (stageType: TournamentStageType) => void;
}) {
  return (
    <div className="flex flex-col gap-4">
      <StageTypeCard
        onClick={() => setStageType(TournamentStageType.Bracket)}
        selected={stageType === TournamentStageType.Bracket}
        type={TournamentStageType.Bracket}
      />
      <StageTypeCard
        onClick={() => setStageType(TournamentStageType.Pool)}
        selected={stageType === TournamentStageType.Pool}
        type={TournamentStageType.Pool}
      />
      <StageTypeCard
        onClick={() => setStageType(TournamentStageType.Points)}
        selected={stageType === TournamentStageType.Points}
        type={TournamentStageType.Points}
      />
    </div>
  );
}
