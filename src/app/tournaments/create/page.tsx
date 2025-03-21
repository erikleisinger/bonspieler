"use client";
import { Provider } from "react-redux";
import { store } from "@/lib/store";
import { EditTournament } from "@/views/Tournament/EditTournament";
import { LoadTournament } from "@/entities/Tournament";
export default function CreateTournament() {
  return (
    <Provider store={store}>
      <LoadTournament editable={true}>
        <EditTournament />
      </LoadTournament>
    </Provider>
  );
}
