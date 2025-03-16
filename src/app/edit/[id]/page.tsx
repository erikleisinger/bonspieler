"use client";

import { use, useEffect, useState } from "react";
import TournamentEdit from "@/app/TournamentEdit";
import { Tournament } from "@/shared/types/Tournament";
import { getTournamentById } from "@/widgets/TournamentViewer";
export default function ViewTournament({ params }) {
  // Unwrap the entire params object first
  const unwrappedParams = use(params);
  const [tournament, setTournament] = useState<Tournament | null>(null);
  useEffect(() => {
    getTournamentById(Number(unwrappedParams.id)).then((data) =>
      setTournament(data)
    );
  }, [unwrappedParams.id]);

  return tournament && tournament.id ? (
    <TournamentEdit tournament={tournament} />
  ) : (
    <div />
  );
}
