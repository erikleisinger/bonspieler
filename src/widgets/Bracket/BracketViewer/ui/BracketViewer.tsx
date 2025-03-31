"use client";
import { useMemo } from "react";

import type { BracketGameType } from "@/entities/Bracket";

import { useAppSelector, useAppDispatch } from "@/lib/store";
import { getSelectedGame, getSelectedDraw } from "../model";
import { Brackets } from "@/shared/Bracket";
import { setSelectedGame } from "@/widgets/Bracket/BracketViewer";

export default function BracketViewer({
  tournamentId,
}: {
  tournamentId: string;
}) {
  const dispatch = useAppDispatch();

  const selectedGame = useAppSelector(getSelectedGame);
  const selectedDraw = useAppSelector(getSelectedDraw);

  function onGameClick(game: BracketGameType) {
    dispatch(setSelectedGame(game));
  }

  const selectedGameIds = useMemo(() => {
    const ids = [];
    if (selectedGame?.id) ids.push(selectedGame.id);
    if (selectedDraw) ids.push(selectedDraw.id);
    return ids;
  }, [selectedGame?.id, selectedDraw?.id]);

  return (
    <Brackets
      onGameResultClick={() => {}}
      availableGameIds={[]}
      backgroundGameIds={[]}
      onBackgroundClick={() => dispatch(setSelectedGame(null))}
      selectedGameIds={selectedGameIds}
      tournamentId={tournamentId}
      onGameClick={onGameClick}
    />
  );
}
