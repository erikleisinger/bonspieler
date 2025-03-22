"use client";
import { LoadTournament } from "@/entities/Tournament";
import { LoadBracket } from "@/widgets/Bracket/BracketEditor";
import StoreLoader from "@/shared/store/StoreLoader";
import { drawTimeSlice } from "@/entities/DrawTime";
import { bracketEventSlice } from "@/entities/BracketEvent";
import { bracketConnectionsSlice } from "@/entities/Bracket/BracketGameConnections";
import { bracketGamesSlice } from "@/entities/Bracket/BracketGame";
import { tournamentSlice } from "@/entities/Tournament";
import { EditBracketView } from "@/views/Bracket/EditBracket";
import { use } from "react";

export default function Page({ params }) {
  // Unwrap the entire params object first
  const { tournamentId, bracketId } = use(params);
  console.log("load bracket: ", tournamentId, bracketId);
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
      <LoadTournament tournamentId={tournamentId}>
        <LoadBracket stageId={bracketId}>
          <EditBracketView />
        </LoadBracket>
      </LoadTournament>
    </StoreLoader>
  );
}
