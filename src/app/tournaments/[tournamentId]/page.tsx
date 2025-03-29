"use client";

import StoreLoader from "@/shared/store/StoreLoader";
import { use } from "react";
import { ViewTournament } from "@/views/Tournament/ViewTournament";
import { LoadTournament } from "@/entities/Tournament";
import { tournamentSlice } from "@/entities/Tournament";

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
    <StoreLoader slices={[tournamentSlice]}>
      <LoadTournament tournamentId={tournamentId} editable={false}>
        <ViewTournament />
      </LoadTournament>
    </StoreLoader>
  );
}
