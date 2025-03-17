"use client";
import { useEffect } from "react";
import LoaderFullPage from "@/shared/ui/loader-full-page";

import { useAppDispatch, useAppSelector } from "@/lib/store";
import {
  initTournamentById,
  getCurrentTournament,
  getCurrentTournamentStatus,
} from "../../model";

export default function TournamentContextProvider({
  children,
  tournamentId,
}: {
  children?: React.ReactNode;
  editable?: boolean;
  tournamentId?: string;
}) {
  // Unwrap the entire params object first

  const dispatch = useAppDispatch();
  const status = useAppSelector(getCurrentTournamentStatus);
  const tournament = useAppSelector(getCurrentTournament);

  useEffect(() => {
    if (!tournamentId) return;
    dispatch(initTournamentById(tournamentId));
  }, [tournamentId]);

  return !tournament || status !== "idle" ? (
    <LoaderFullPage />
  ) : (
    <>{children}</>
  );
}
