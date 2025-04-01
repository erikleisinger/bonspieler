import { TournamentStageContext } from "./TournamentStageContext";
import { useGetTournamentStagesQuery } from "@/shared/api";

export default function TournamentStageContextProvider({
  children,
  tournamentId,
}: {
  children: React.ReactNode;
  tournamentId: string;
}) {
  const { data: stages } = useGetTournamentStagesQuery(
    { tournamentId },
    {
      skip: !tournamentId,
      selectFromResult: ({ data = [] }) => {
        return {
          data: (data || []).reduce((all, current) => {
            const { id } = current;
            return { ...all, [id]: current };
          }, {}),
        };
      },
    }
  );

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
