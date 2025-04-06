import { useEffect, useRef, useState } from "react";
import GameConnection2 from "./GameConnection2";

import type { BracketGame } from "@/modules/bracket-manager/shared/types";

export default function GameConnections({
  games,
  containerId,
}: {
  games: BracketGame[];
  containerId: string;
}) {
  const resizeObserver = useRef<ResizeObserver>(null);

  const [showConnections, setShowConnections] = useState(true);
  const connectionsInitialized = useRef(false);

  useEffect(() => {
    resizeObserver.current = new ResizeObserver(() => {
      if (!connectionsInitialized.current) {
        connectionsInitialized.current = true;
        return;
      }
      setShowConnections(false);
      setTimeout(() => {
        setShowConnections(true);
      }, 300);
    });
    resizeObserver.current.observe(document.getElementById(containerId));

    return () => {
      resizeObserver.current.disconnect();
    };
  }, []);

  return (
    <>
      {showConnections &&
        games.map(({ id: gameId }) => (
          <GameConnection2 key={gameId} gameId={gameId} />
        ))}
    </>
  );
}
