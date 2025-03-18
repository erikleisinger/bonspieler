"use client";
import { Provider } from "react-redux";
import { store } from "@/lib/store";
import { use } from "react";
import { ViewTournament } from "@/views/Tournament/ViewTournament";
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
    <Provider store={store}>
      <TournamentContextProvider tournamentId={tournamentId} editable={false}>
        <ViewTournament />
      </TournamentContextProvider>
    </Provider>
  );
}
