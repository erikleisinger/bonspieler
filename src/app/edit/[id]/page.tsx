"use client";

import { use } from "react";
import TournamentView from "@/app/TournamentView";
import testTourney from "@/../mock/test-tourney.json";

export default function EditTournament({ params }) {
  // Unwrap the entire params object first
  const unwrappedParams = use(params);

  // Now you can safely access the id
  const id = unwrappedParams.id;

  console.log("id: ", id);
  return <TournamentView tournament={testTourney} />;
}
