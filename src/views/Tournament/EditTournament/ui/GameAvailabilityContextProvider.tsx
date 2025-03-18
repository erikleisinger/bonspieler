import { useEffect, useState } from "react";
import { GameAvailabilityContext } from "@/shared/Bracket/GameAvailabilityContext";
import { useAppSelector } from "@/lib/store";
import {
  getLookingToAssignTeam,
  getLookingForLoserConnection,
  getBracketEventConnections,
  setLookingForLoserConnection,
  setLookingToAssignTeam,
} from "@/entities/BracketEvent";
import { BracketConnections } from "@/entities/Bracket";
import { useAppDispatch } from "@/lib/store";
export default function GameAvailabilityContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();
  const lookingToAssignTeam = useAppSelector(getLookingToAssignTeam);
  const lookingForLoserConnection = useAppSelector(
    getLookingForLoserConnection
  );
  const connections: BracketConnections = useAppSelector(
    getBracketEventConnections
  );

  const [availableGameIds, setAvailableGameIds] = useState<string[]>([]);

  useEffect(() => {
    if (!lookingToAssignTeam && !lookingForLoserConnection) return;
    if (lookingToAssignTeam) {
      const available = Object.entries(connections).reduce(
        (acc, [key, value]) => {
          const { teams } = value;
          if (teams.some(({ teamId }) => teamId === lookingToAssignTeam))
            return acc;
          if (!teams.some(({ teamId }) => teamId === "seed")) return acc;
          return [...acc, key];
        },
        []
      );
      setAvailableGameIds(available);
    } else {
      return;
    }
  }, [
    lookingToAssignTeam,
    lookingForLoserConnection,
    JSON.stringify(connections),
  ]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        !event
          .composedPath()
          .some((e) => e?.classList && e?.classList?.contains("BRACKET_GAME"))
      ) {
        setAvailableGameIds([]);
        dispatch(setLookingForLoserConnection(null));
        dispatch(setLookingToAssignTeam(null));
      }
    }
    if (availableGameIds?.length)
      document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [availableGameIds?.length]);

  return (
    <GameAvailabilityContext.Provider
      value={{
        availableGameIds,
      }}
    >
      {children}
    </GameAvailabilityContext.Provider>
  );
}
