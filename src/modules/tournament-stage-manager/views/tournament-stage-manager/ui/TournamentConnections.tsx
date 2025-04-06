import { useAppSelector } from "@/lib/store";
import { useEffect, useMemo } from "react";
import Xarrow from "react-xarrows";

import { useBracketInteractions } from "@/modules/bracket-manager";
import MousePos from "./MousePos";

export default function TournamentConnections() {
  const {
    getAllConnections,
    isLookingForNextStageConnectionAnywhere,
    cancelLookingForNextStageConnection,
  } = useBracketInteractions();
  const connections = useAppSelector(getAllConnections);
  const searchGame = useAppSelector(isLookingForNextStageConnectionAnywhere);
  const searchGameId = searchGame?.lookingForNextStageConnection?.id;
  const searchStage = searchGame?.id;

  useEffect(() => {
    function onClick(e) {
      const path = e.composedPath();
      // if it includes a bracket game, return
      if (path.some((el) => el.id?.startsWith("BRACKET-GAME-"))) return;
      console.log("uh oh");
      cancelLookingForNextStageConnection(searchStage);
    }
    window.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("click", onClick);
    };
  }, [searchGameId, searchStage]);

  const elements = useMemo(() => {
    return [
      ...connections.map(({ originGameId, gameId }) => (
        <Xarrow
          key={originGameId}
          start={"BRACKET-GAME-" + originGameId}
          end={"BRACKET-GAME-" + gameId}
          dashness={true}
          headSize={1}
          strokeWidth={2}
        />
      )),
      ,
    ];
  }, [connections]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {elements}
      {searchGameId && <MousePos originId={"BRACKET-GAME-" + searchGameId} />}
    </div>
  );
}
