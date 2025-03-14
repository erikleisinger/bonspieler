"use client";

import { use } from "react";
import TournamentEdit from "@/app/TournamentEdit";
import { TOURNAMENT_STORAGE_KEY } from "@/app/storage";
export default function EditTournament({ params }) {
  // Unwrap the entire params object first
  const unwrappedParams = use(params);

  // Now you can safely access the id
  const id = unwrappedParams.id;

  /**
   * Temporary save logic to local storage;
   * obviously persisting to db later on
   */
  const tournaments = localStorage.getItem(TOURNAMENT_STORAGE_KEY);
  const tournament = JSON.parse(tournaments)[id];

  return <TournamentEdit tournament={tournament} />;
}
