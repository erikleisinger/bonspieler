import type { TournamentStage } from "@/entities/Tournament";
import Typography from "@/shared/ui/typography";
export default function StageDetailsPopup({
  stage,
  onClose,
}: {
  stage: TournamentStage;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-glass backdrop-blur-sm z-10 top-[64px] flex justify-center items-center">
      <div className="absolute inset-0  " onClick={onClose}></div>
      <div className="  border-l-4 border-indigo-500 skew-x-[20deg]  transition-all duration-300   relative z-[1] h-fit w-fit min-h-[200px] min-w-screen md:min-w-[400px] m-auto">
        <div className="p-6 ">
          <Typography tag="h2" className="skew-x-[-20deg]">
            {stage.name}
          </Typography>
          <Typography tag="p" className="skew-x-[-20deg]">
            {stage.type} stage
          </Typography>
          <Typography tag="p" className="skew-x-[-20deg]">
            {stage.num_start_teams || 0} teams
          </Typography>
        </div>
      </div>
    </div>
  );
}
