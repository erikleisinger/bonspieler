"use client";
import { useEffect, useState } from "react";
import { TournamentContext, TournamentStage } from "@/entities/Tournament/lib";
import { Tournament } from "@/shared/types/Tournament";
import { getTournamentById, getTournamentTeams } from "../../api";
import LoaderFullPage from "@/shared/ui/loader-full-page";
export default function TournamentContextProvider({
  children,
  editable = false,
  tournamentId,
}: {
  children?: React.ReactNode;
  editable?: boolean;
  tournamentId?: string;
}) {
  // Unwrap the entire params object first
  const [tournament, setTournament] = useState<Tournament | null>({
    id: null,
    name: "New Bonspiel",
    stages: [],
  });
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(!!tournamentId);
  useEffect(() => {
    if (!tournamentId) return;
    setLoading(true);
    Promise.all([
      getTournamentById(tournamentId),
      getTournamentTeams(tournamentId),
    ]).then((res) => {
      const [tournamentData, teamsData] = res;
      setTournament(tournamentData);
      setTeams(teamsData);
      setLoading(false);
    });
  }, [tournamentId]);

  function updateStages(newStages: TournamentStage[]) {
    setTournament({
      ...tournament,
      stages: newStages,
    });
  }
  function updateTournament(updates: Partial<Tournament>) {
    setTournament({
      ...tournament,
      ...updates,
    });
  }

  return loading ? (
    <LoaderFullPage />
  ) : (
    <TournamentContext.Provider
      value={{
        id: tournament?.id || "",
        name: tournament?.name || "",
        stages: tournament?.stages || [],
        teams,
        ...(editable
          ? {
              updateTournament,
              updateStages,
            }
          : {}),
      }}
    >
      {children}
    </TournamentContext.Provider>
  );
}
