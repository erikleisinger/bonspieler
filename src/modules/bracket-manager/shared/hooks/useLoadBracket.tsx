import { useEffect, useMemo } from "react";
import { useAppDispatch } from "@/lib/store";
// Assuming these are your action creators from the Redux slice
import {
  initBracketEvent,
  setBrackets,
  setBracketStageInfo,
  setConnections,
} from "../store";
import {
  useGetBracketConnectionsQuery,
  useGetBracketGamesQuery,
  useGetTournamentStageByIdQuery,
} from "@/shared/api"; // Assuming RTK Query setup

export default function useLoadBracket({ stageId }: { stageId: string }) {
  const dispatch = useAppDispatch();

  // Fetch Stage Info (only if needed directly, otherwise just use its status)
  const {
    isFetching: isLoadingStage,
    isSuccess: isSuccessStage,
    isError: isErrorStage,
    data: stageData,
  } = useGetTournamentStageByIdQuery(stageId, {
    skip: !stageId, // Skip query if stageId is falsy
  });

  // Fetch Games (Brackets)
  const {
    isFetching: isLoadingGames,
    isSuccess: isSuccessGames,
    isError: isErrorGames,
    data: gamesData, // Contains { brackets: [...] } on success
  } = useGetBracketGamesQuery(stageId, {
    skip: !stageId,
  });

  // Fetch Connections
  const {
    isFetching: isLoadingConnections,
    isSuccess: isSuccessConnections,
    isError: isErrorConnections,
    // Rename data to avoid conflict with the 'connections' variable name used in dispatch
    data: connectionsData,
  } = useGetBracketConnectionsQuery(stageId, {
    skip: !stageId,
  });

  // --- Initialization Logic ---
  // Dispatch the init event once when a valid stageId is provided.
  // Consider if this action truly needs to be dispatched from here,
  // or if it's handled implicitly by reducers when data arrives,
  // or if it should happen elsewhere in your application flow.
  useEffect(() => {
    if (stageId) {
      // You might want additional logic here to check if this stageId
      // has *already* been initialized in Redux to avoid redundant dispatches
      // e.g., const isInitialized = useSelector(selectIsStageInitialized(stageId));
      // if (!isInitialized) { dispatch(...) }
      dispatch(initBracketEvent({ stageId }));
    }
    // Optional: Add cleanup logic if needed when stageId changes or component unmounts
    // return () => { /* dispatch cleanup action? */ };
  }, [stageId, dispatch]); // Re-run if stageId changes

  // --- Data Dispatch Logic ---

  // Effect to dispatch bracket/game data when it's successfully loaded
  useEffect(() => {
    // Only dispatch if the query succeeded, data is present, and we have a stageId
    if (isSuccessGames && gamesData && stageId) {
      dispatch(
        setBrackets({
          stageId,
          // Use optional chaining and nullish coalescing for safety
          brackets: gamesData?.brackets ?? [],
        })
      );
    }
  }, [isSuccessGames, gamesData, stageId, dispatch]); // Depend on success flag and data

  // Effect to dispatch connection data when it's successfully loaded
  useEffect(() => {
    // Only dispatch if the query succeeded, data is present, and we have a stageId
    if (isSuccessConnections && connectionsData && stageId) {
      dispatch(
        setConnections({
          stageId,
          // Use optional chaining and nullish coalescing for safety
          winnerConnections: connectionsData?.winnerConnections ?? {},
          loserConnections: connectionsData?.loserConnections ?? {},
          originConnections: connectionsData?.originConnections ?? {},
        })
      );
    }
  }, [isSuccessConnections, connectionsData, stageId, dispatch]);

  useEffect(() => {
    // Only dispatch if the query succeeded, data is present, and we have a stageId
    if (isSuccessStage && stageData && stageId) {
      const { id, name = "", type = "bracket", order = 0 } = stageData;
      dispatch(
        setBracketStageInfo({
          stageId,
          id,
          name: name || "",
          type: type || "bracket",
          order: order || 0,
        })
      );
    }
  }, [isSuccessStage, stageData, stageId, dispatch]);

  // --- Combined Loading and Status ---
  // Determine overall loading state (true if any essential query is fetching)
  const isLoading = useMemo(() => {
    // Only consider loading if stageId is present
    return Boolean(
      stageId && (isLoadingStage || isLoadingGames || isLoadingConnections)
    );
  }, [isLoadingStage, isLoadingGames, isLoadingConnections, stageId]);

  // Determine overall success state (true if all essential queries succeeded)
  // Adjust this logic based on which queries are strictly necessary for a "success" state
  const isSuccess = useMemo(() => {
    return Boolean(
      stageId && isSuccessStage && isSuccessGames && isSuccessConnections
    );
  }, [isSuccessStage, isSuccessGames, isSuccessConnections, stageId]);

  // Determine overall error state (true if any query failed)
  const isError = useMemo(() => {
    return Boolean(
      stageId && (isErrorStage || isErrorGames || isErrorConnections)
    );
  }, [isErrorStage, isErrorGames, isErrorConnections, stageId]);

  // --- Return Value ---
  // Return status flags that consuming components can use
  return {
    isLoading, // Is any data currently being fetched?
    isSuccess, // Have all required data fetches completed successfully?
    isError, // Did any data fetch encounter an error?
    // Optionally return data if the consuming component needs direct access
    // gamesData,
    // connectionsData,
  };
}
