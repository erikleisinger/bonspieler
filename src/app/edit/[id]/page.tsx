"use client";

import { use, useEffect, useState } from "react";
import { EditTournament } from "@/views/EditTournament";
import { Tournament } from "@/shared/types/Tournament";
import { getTournamentById } from "@/widgets/TournamentViewer";
import LoaderFullPage from "@/shared/ui/loader-full-page";
export default function Page({ params }) {
  // Unwrap the entire params object first
  const unwrappedParams = use(params);
  const [tournament, setTournament] = useState<Tournament | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    getTournamentById(Number(unwrappedParams.id)).then((data) => {
      setTournament(data);
      console.log(data);
      setLoading(false);
    });
  }, [unwrappedParams.id]);

  return loading ? (
    <LoaderFullPage />
  ) : (
    <EditTournament tournament={tournament} />
  );
}
