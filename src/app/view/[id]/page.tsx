"use client";

import { use, useEffect, useState } from "react";
import TournamentView from "@/app/TournamentView";
import { Tournament } from "@/shared/types/Tournament";
import { getTournamentById } from "@/widgets/TournamentViewer";
export default function ViewTournament({
  params,
}: {
  params: {
    id: string;
  };
}) {
  // Unwrap the entire params object first
  const unwrappedParams = use(params);
  const [tournament, setTournament] = useState<Tournament | null>(null);

  useEffect(() => {
    const id = Number(unwrappedParams?.id);
    if (typeof id !== "number") return;
    getTournamentById(unwrappedParams.id).then((data) => setTournament(data));
  }, [unwrappedParams.id]);

  return tournament && tournament.id ? (
    <TournamentView tournament={tournament} />
  ) : (
    <div />
  );
}
