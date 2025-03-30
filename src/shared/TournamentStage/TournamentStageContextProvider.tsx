import { TournamentStageContext } from "./TournamentStageContext";
import { useGetTournamentStagesQuery } from "../api";

export default function TournamentStageContextProvider({
  children,
  tournamentId,
}: {
  children: React.ReactNode;
  tournamentId: string;
}) {
  const { data: stages } = useGetTournamentStagesQuery(tournamentId, {
    refetchOnMountOrArgChange: true,
    skip: !tournamentId,
    selectFromResult: ({ data = [] }) => {
      return {
        data: (data || []).reduce((all, current) => {
          const { id } = current;
          return { ...all, [id]: current };
        }, {}),
      };
    },
  });

  return (
    <TournamentStageContext.Provider
      value={{
        tournamentId,
        stages,
      }}
    >
      {children}
    </TournamentStageContext.Provider>
  );
}
