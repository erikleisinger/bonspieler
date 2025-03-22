"use client";
import StoreLoader from "@/shared/store/StoreLoader";
import { use } from "react";
import { EditTournament } from "@/views/Tournament/EditTournament";
import { LoadTournament } from "@/entities/Tournament";
import { tournamentSlice } from "@/entities/Tournament";

export default function Page({ params }) {
  // Unwrap the entire params object first
  const unwrappedParams = use(params);
  const tournamentId = unwrappedParams.id;

  return (
    <StoreLoader slices={[tournamentSlice]}>
      <LoadTournament tournamentId={tournamentId} editable={true}>
        <EditTournament />
      </LoadTournament>
    </StoreLoader>
  );
}
