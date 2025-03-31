"use client";
import { useGetTournamentStagesQuery } from "@/shared/api";
import { useAppDispatch } from "@/lib/store";
import { initBlankTournament } from "@/entities/Tournament";
import { useLayoutEffect } from "react";
import LoaderFullPage from "@/shared/ui/loader-full-page";
export default function LoadTournament({
  children,
  tournamentId,
}: {
  children?: React.ReactNode;
  editable?: boolean;
  tournamentId?: string;
}) {
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    dispatch(initBlankTournament(tournamentId));
  }, []);
  const { isLoading } = useGetTournamentStagesQuery(
    { tournamentId },
    {
      skip: !tournamentId,
    }
  );
  return isLoading ? <LoaderFullPage></LoaderFullPage> : <>{children}</>;
}
