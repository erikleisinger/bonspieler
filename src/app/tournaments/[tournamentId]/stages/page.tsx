"use client";
import StoreLoader from "@/shared/store/StoreLoader";
import { drawTimeSlice } from "@/entities/DrawTime";
import { bracketEventSlice } from "@/entities/BracketEvent";
import { bracketConnectionsSlice } from "@/entities/Bracket/BracketGameConnections";
import { bracketGamesSlice } from "@/entities/Bracket/BracketGame";
import { tournamentSlice } from "@/entities/Tournament";
import { bracketViewerSlice } from "@/widgets/Bracket/BracketViewer";
import { bracketEditorSlice } from "@/widgets/Bracket/BracketEditor";
import { EditTournamentStagesView } from "@/views/Tournament/EditTournamentStages";
import { use } from "react";
export default function Page({ params }) {
  // Unwrap the entire params object first
  const { tournamentId } = use(params);
  return (
    <StoreLoader
      slices={[
        drawTimeSlice,
        bracketEventSlice,
        bracketConnectionsSlice,
        bracketGamesSlice,
        tournamentSlice,
        bracketViewerSlice,
        bracketEditorSlice,
      ]}
    >
      <EditTournamentStagesView tournamentId={tournamentId} />
    </StoreLoader>
  );
}
