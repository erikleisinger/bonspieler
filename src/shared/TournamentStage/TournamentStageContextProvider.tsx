import { TournamentStage } from "@/entities/Tournament";
import { TournamentStageContext } from "./TournamentStageContext";
import { useAppSelector } from "@/lib/store";
import { useGetTournamentStagesQuery } from "../api";
import {
  getStartTeams,
  getEndTeams,
  getNextStageName,
  getPrevStageName,
} from "@/entities/Tournament";
import { useMemo } from "react";

export default function TournamentStageContextProvider({
  children,
  stage,
  tournamentId,
}: {
  children: React.ReactNode;
  stage: TournamentStage;
  tournamentId: string;
}) {
  const { data: stages } = useGetTournamentStagesQuery(tournamentId, {
    refetchOnMountOrArgChange: true,
    skip: !tournamentId,
  });

  const startTeams = stage.num_start_teams || 0;
  const endTeams = stage.num_end_teams || 0;

  const thisStageIndex = stages?.findIndex((s) => s.id === stage.id) || 0;
  const prevStageName = useMemo(() => {
    if (thisStageIndex === 0) return null;
    return (stages || [])[thisStageIndex - 1]?.name || "Unnamed Stage";
  }, [thisStageIndex, stages]);

  const nextStageName = useMemo(() => {
    if (thisStageIndex === stages?.length - 1) return null;
    const nextStage = (stages || [])[thisStageIndex + 1];

    if (nextStage?.id) return nextStage.name || "Unnamed Stage";
  }, [thisStageIndex, stages]);

  return (
    <TournamentStageContext.Provider
      value={{
        startTeams,
        endTeams,
        prevStageName,
        nextStageName,
      }}
    >
      {children}
    </TournamentStageContext.Provider>
  );
}
