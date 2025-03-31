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

import { setConnections } from "@/entities/Bracket/BracketGameConnections";

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
      skip: !stageId,
    });

  useLayoutEffect(() => {
    return () => {
      dispatch(resetState());
    };
  }, []);

  useEffect(() => {
    if (gamesData) {
      dispatch(resetState());

      setTimeout(() => {
        const { brackets, schedule } = gamesData;

        if (brackets) {
          dispatch(initBracketGames(brackets));
        }

        if (schedule) {
          dispatch(setBracketGamesSchedule(schedule));
        }
      }, 0);
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
      skip: !stageId,
    });

  useEffect(() => {
    if (connections) {
      dispatch(setConnections(connections));
    }
  }, [connections, dispatch]);

  const isLoading =
    isLoadingGames ||
    isLoadingDrawTimes ||
    isLoadingConnections ||
    isLoadingStage;

  return isLoading ? <div /> : <>{children}</>;
}
