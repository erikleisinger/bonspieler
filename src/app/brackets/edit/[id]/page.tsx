"use client";
import StoreLoader from "@/shared/store/StoreLoader";
import { drawTimeSlice } from "@/entities/DrawTime";
import { bracketEventSlice } from "@/entities/BracketEvent";
import { bracketConnectionsSlice } from "@/entities/Bracket/BracketGameConnections";
import { bracketGamesSlice } from "@/entities/Bracket/BracketGame";
import { tournamentSlice } from "@/entities/Tournament";

import { use } from "react";
import { EditBracketView } from "@/views/Bracket/EditBracket";

export default function Page({ params }) {
  // Unwrap the entire params object first
  const unwrappedParams = use(params);
  const stageId = unwrappedParams.id;

  return (
    <StoreLoader
      slices={[
        drawTimeSlice,
        bracketEventSlice,
        bracketConnectionsSlice,
        bracketGamesSlice,
        tournamentSlice,
      ]}
    >
      <EditBracketView stageId={stageId} />
    </StoreLoader>
  );
}
