"use client";
import { Provider } from "react-redux";
import { store } from "@/lib/store";
import { use } from "react";
import { ViewTournament } from "@/views/Tournament/ViewTournament";
import { LoadTournament } from "@/entities/Tournament";

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
      <LoadTournament tournamentId={tournamentId} editable={false}>
        <ViewTournament />
      </LoadTournament>
    </Provider>
  );
}
