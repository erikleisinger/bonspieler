import { TournamentStage } from "@/entities/Tournament";
import { TournamentStageContext } from "./TournamentStageContext";
import { useAppSelector } from "@/lib/store";
import {
  getStartTeams,
  getEndTeams,
  getNextStageName,
  getPrevStageName,
} from "@/entities/Tournament";

export default function TournamentStageContextProvider({
  children,
  stage,
}: {
  children: React.ReactNode;
  stage: TournamentStage;
}) {
  const { order } = stage;
  const startTeams = useAppSelector(getStartTeams)(order);
  const endTeams = useAppSelector(getEndTeams)(order);
  const prevStageName = useAppSelector(getPrevStageName)(order);
  const nextStageName = useAppSelector(getNextStageName)(order);

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
