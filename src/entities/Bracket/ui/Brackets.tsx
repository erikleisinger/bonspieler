import React, { useEffect } from "react";
import { scrollToGame } from "../lib/scrollToGame";
import { useAppSelector } from "@/lib/store";
import { getAvailableGames } from "@/entities/BracketEvent";

export default function Brackets({ children }: { children?: React.ReactNode }) {
  const availableGames = useAppSelector(getAvailableGames);

  useEffect(() => {
    if (!availableGames.length) return;
    const [firstGameId] = availableGames;
    if (!firstGameId) return;
    scrollToGame(firstGameId);
  }, [availableGames.length]);

  return (
    <div className="relative overflow-auto">
      <div className="flex flex-col gap-16 absolute inset-0">{children}</div>
    </div>
  );
}
