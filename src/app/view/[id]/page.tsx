"use client";

import { use } from "react";
import { ViewTournament } from "@/views/ViewTournament";
import { TournamentContextProvider } from "@/entities/Tournament";

export default function Page({
  params,
}: {
  params: {
    id: string;
  };
}) {
  // Unwrap the entire params object first
  const unwrappedParams = use(params);
  const tournamentId = unwrappedParams.id;

  return (
    <TournamentContextProvider tournamentId={tournamentId} editable={false}>
      <ViewTournament />
    </TournamentContextProvider>
  );
}
