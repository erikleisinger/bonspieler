import { useAppDispatch } from "@/lib/store";
import { useState, useLayoutEffect } from "react";
import { initBracketConnections } from "@/entities/Bracket/BracketGameConnections";
import { initBracketGames } from "@/entities/Bracket/BracketGame";
import { initDrawTimesForStage } from "@/entities/DrawTime";
import LoaderFullPage from "@/shared/ui/loader-full-page";
export default function LoadBracket({
  children,
  stageId,
}: {
  children: React.ReactNode;
  stageId: string;
}) {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  useLayoutEffect(() => {
    Promise.all([
      dispatch(initBracketGames(stageId)),
      dispatch(initBracketConnections(stageId)),

      dispatch(initDrawTimesForStage(stageId)),
    ]).then(() => {
      setLoading(false);
    });
  }, []);

  return loading ? <LoaderFullPage /> : <>{children}</>;
}
