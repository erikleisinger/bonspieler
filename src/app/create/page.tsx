"use client";
import { Provider } from "react-redux";
import { store } from "@/lib/store";
import { EditTournament } from "@/views/Tournament/EditTournament";
import { TournamentContextProvider } from "@/entities/Tournament";
export default function CreateTournament() {
  return (
    <Provider store={store}>
      <TournamentContextProvider editable={true}>
        <EditTournament />
      </TournamentContextProvider>
    </Provider>
  );
}
