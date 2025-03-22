"use client";
import { TournamentList } from "@/views/Tournament/TournamentList";
import GlobalLayout from "../global-layout";
export default function Page() {
  // Unwrap the entire params object first

  return (
    <GlobalLayout>
      <TournamentList />
    </GlobalLayout>
  );
}
