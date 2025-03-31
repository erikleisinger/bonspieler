import { useAppSelector } from "@/lib/store";

import {
  getBracketGames,
  getBracketGamesSchedule,
  getReadableIdIndex,
} from "@/entities/Bracket/BracketGame";
import {
  getOriginConnections,
  getLoserConnections,
  getWinnerConnections,
} from "@/entities/Bracket/BracketGameConnections";
import { BracketContext } from "./BracketContext";
export default function BracketProvider({
  children,
  stageId,
}: {
  children: React.ReactNode;
  stageId: string;
}) {
  const brackets = useAppSelector(getBracketGames);
  const originConnections = useAppSelector(getOriginConnections);
  const schedule = useAppSelector(getBracketGamesSchedule);
  const winnerConnections = useAppSelector(getWinnerConnections);
  const loserConnections = useAppSelector(getLoserConnections);
  const readableIdIndex = useAppSelector(getReadableIdIndex);

  return (
    <BracketContext.Provider
      value={{
        originConnections,
        winnerConnections,
        loserConnections,
        brackets,
        schedule,
        loading: false,
        readableIdIndex,
        stageId,
      }}
    >
      {children}
    </BracketContext.Provider>
  );
}
