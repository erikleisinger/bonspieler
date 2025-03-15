"use client";

import { use, useEffect, useState } from "react";
import TournamentView from "@/app/TournamentView";
import { Tournament } from "@/shared/types/Tournament";
import { api } from "@/shared/api";
export default function ViewTournament({ params }) {
  // Unwrap the entire params object first
  const unwrappedParams = use(params);
  const [tournament, setTournament] = useState<Tournament | null>(null);

  useEffect(() => {
    api.get.tournament
      .byId(unwrappedParams.id)
      .then((data) => setTournament(data));
  }, [unwrappedParams.id]);

  return tournament && tournament.id ? (
    <TournamentView tournament={tournament} />
  ) : (
    <div />
  );
}
