"use client";
import { useLayoutEffect } from "react";
import LoaderFullPage from "@/shared/ui/loader-full-page";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/lib/store";
import { initNewTournament } from "../model";

export default function LoadTournament({}: { editable?: boolean }) {
  // Unwrap the entire params object first

  const dispatch = useAppDispatch();
  const router = useRouter();

  useLayoutEffect(() => {
    dispatch(initNewTournament()).then(({ payload }) => {
      const { id } = payload;
      router.push(`/tournaments/${id}/edit`);
    });
  }, []);

  return <LoaderFullPage />;
}
