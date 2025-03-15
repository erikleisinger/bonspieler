"use client";

import { use } from "react";
import TournamentView from "@/app/TournamentView";
import { TOURNAMENT_STORAGE_KEY } from "@/app/storage";
export default function ViewTournament({ params }) {
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

  return <TournamentView tournament={tournament} />;
}
