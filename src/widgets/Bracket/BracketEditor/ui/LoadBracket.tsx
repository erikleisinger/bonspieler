import { useEffect, useLayoutEffect } from "react";

import { useFetchDrawTimesForStageQuery } from "@/entities/DrawTime";
import {
  useGetBracketConnectionsQuery,
  useGetBracketGamesQuery,
  useGetTournamentStageByIdQuery,
} from "@/shared/api";

import { useAppDispatch } from "@/lib/store";

/**
 * Id and tournament id
 */

import {
  setBracketEventTournamentId,
  setBracketEventId,
  setBracketEventOrder,
  setBracketEventName,
} from "@/entities/BracketEvent";

/**
 * Games
 */

import {
  initBracketGames,
  setBracketGamesSchedule,
  resetState,
} from "@/entities/Bracket/BracketGame";

/**
 * Connections
 */

import {
  resetConnections,
  setConnections,
} from "@/entities/Bracket/BracketGameConnections";

import LoaderFullPage from "@/shared/ui/loader-full-page";
export default function LoadBracket({
  children,
  stageId,
}: {
  children: React.ReactNode;
  stageId: string;
}) {
  const dispatch = useAppDispatch();

  /**
   * Id and tournament id
   */

  const { isLoading: isLoadingStage, data: stageData } =
    useGetTournamentStageByIdQuery(stageId, {
      refetchOnMountOrArgChange: true,
      skip: !stageId,
    });

  useEffect(() => {
    if (stageData) {
      const { id, tournament_id, order, name } = stageData;
      if (id) {
        dispatch(setBracketEventId(id));
      }
      if (tournament_id) {
        dispatch(setBracketEventTournamentId(tournament_id));
      }
      if (order) {
        dispatch(setBracketEventOrder(order));
      }
      dispatch(setBracketEventName(name));
    }
  }, [stageData, dispatch]);

  /**
   * Bracket games
   */

  const { isLoading: isLoadingGames, data: gamesData } =
    useGetBracketGamesQuery(stageId, {
      refetchOnMountOrArgChange: true,
      skip: !stageId,
    });

  useLayoutEffect(() => {
    // dispatch(resetState());
  }, []);

  useEffect(() => {
    if (gamesData) {
      const { brackets, schedule } = gamesData;

      if (brackets) {
        dispatch(initBracketGames(brackets));
      }

      if (schedule) {
        dispatch(setBracketGamesSchedule(schedule));
      }
    }
  }, [gamesData, dispatch]);

  const isLoadingDrawTimes = false;
  // const { isLoading: isLoadingDrawTimes } =
  //   useFetchDrawTimesForStageQuery(stageId);

  /**
   * Get Bracket Connections
   */

  const { isLoading: isLoadingConnections, data: connections } =
    useGetBracketConnectionsQuery(stageId, {
      refetchOnMountOrArgChange: true,
      skip: !stageId,
    });

  useEffect(() => {
    if (connections) {
      dispatch(resetConnections());
      setTimeout(() => {
        dispatch(setConnections(connections));
      }, 0);
    }
  }, [connections, dispatch]);

  const isLoading =
    isLoadingGames ||
    isLoadingDrawTimes ||
    isLoadingConnections ||
    isLoadingStage;

  return isLoading ? <LoaderFullPage /> : <>{children}</>;
}
