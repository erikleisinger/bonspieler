import { BracketSchedule } from "@/entities/Bracket";
import {
  LoserConnections,
  OriginConnections,
  WinnerConnections,
} from "@/entities/Bracket/BracketGameConnections";
import { min } from "date-fns";

export function getAvailableDrawsForBracketGame({
  gameId,
  schedule,
  winnerConnections,
  loserConnections,
  originConnections,
}: {
  gameId: string;
  schedule: BracketSchedule;
  winnerConnections: WinnerConnections;
  loserConnections: LoserConnections;
  originConnections: OriginConnections;
}) {
  const numDraws = Math.max(...Object.values(schedule));
  const nextWinnerGame = winnerConnections[gameId];
  const nextLoserGame = loserConnections[gameId];
  const prevGames = originConnections[gameId] || [];
  let minDraw = 1;

  if (prevGames.length) {
    minDraw =
      Math.max(
        ...prevGames
          .filter(({ gameId }) => !!gameId)
          .map(({ gameId }) => schedule[gameId])
      ) + 1;
  }

  let maxDraw = numDraws;
  const nextGames = [nextLoserGame, nextWinnerGame].filter(Boolean);
  if (nextGames?.length) {
    maxDraw = Math.max(...nextGames.map((gameId) => schedule[gameId])) - 1;
  }

  const availableDraws = [];
  for (let i = minDraw; i <= maxDraw; i++) {
    availableDraws.push(i);
  }
  return availableDraws;
}
