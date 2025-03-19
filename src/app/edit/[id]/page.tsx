"use client";
import { Provider } from "react-redux";
import { store } from "@/lib/store";
import { use } from "react";
import { EditTournament } from "@/views/Tournament/EditTournament";
import { LoadTournament } from "@/entities/Tournament";

export default function Page({ params }) {
  // Unwrap the entire params object first
  const unwrappedParams = use(params);
  const tournamentId = unwrappedParams.id;

  return (
    <Provider store={store}>
      <LoadTournament tournamentId={tournamentId} editable={true}>
        <EditTournament />
      </LoadTournament>
    </Provider>
  );
}
