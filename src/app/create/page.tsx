"use client";
import { EditTournament } from "@/views/EditTournament";
import { TournamentContextProvider } from "@/entities/Tournament";
export default function CreateTournament() {
  return (
    <TournamentContextProvider editable={true}>
      <EditTournament />
    </TournamentContextProvider>
  );
}
