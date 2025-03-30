"use client";
import { useEffect, useMemo, useState } from "react";

import type { BracketGameType } from "@/entities/Bracket";

import { useAppSelector, useAppDispatch } from "@/lib/store";
import { getSelectedGame, getSelectedDraw } from "../model";
import { Brackets, useBracket } from "@/shared/Bracket";
import { setSelectedGame } from "@/widgets/Bracket/BracketViewer";

export default function BracketViewer({
  tournamentId,
  stageId,
}: {
  tournamentId: string;
  stageId: string;
}) {
  const dispatch = useAppDispatch();

  const selectedGame = useAppSelector(getSelectedGame);
  const selectedDraw = useAppSelector(getSelectedDraw);
  const {
    loserConnections,
    winnerConnections,
    originConnections,
    brackets,
    schedule,
  } = useBracket(stageId);

  function onGameClick(game: BracketGameType) {
    dispatch(setSelectedGame(game));
  }

  const selectedGameIds = useMemo(() => {
    const ids = [];
    if (selectedGame?.id) ids.push(selectedGame.id);
    if (selectedDraw) ids.push(selectedDraw.id);
    return ids;
  }, [selectedGame?.id, selectedDraw?.id]);

  return brackets?.length ? (
    <Brackets
      schedule={schedule}
      winnerConnections={winnerConnections}
      loserConnections={loserConnections}
      brackets={brackets}
      originConnections={originConnections}
      onGameClick={onGameClick}
      onGameResultClick={() => {}}
      availableGameIds={[]}
      backgroundGameIds={[]}
      onBackgroundClick={() => dispatch(setSelectedGame(null))}
      selectedGameIds={selectedGameIds}
      tournamentId={tournamentId}
      stageId={stageId}
    />
  ) : (
    <div />
  );
}
