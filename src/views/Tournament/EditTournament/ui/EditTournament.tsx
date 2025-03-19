import { useState } from "react";

/* Types & enums */

import {
  TournamentStageType,
  type TournamentStage,
} from "@/entities/Tournament";

/* Store */

import { useAppDispatch, useAppSelector } from "@/lib/store";
import { getCurrentTournament } from "@/entities/Tournament";
import { setBracketEvent, resetBracketEvent } from "@/entities/BracketEvent";

/* Components */

import { TournamentEditor } from "@/widgets/Tournament/TournamentEditor";

import EditingStage from "./EditingStage";

/* Utils */
import { saveTournament } from "../lib";

export default function EditTournament() {
  const dispatch = useAppDispatch();
  const tournament = useAppSelector(getCurrentTournament);

  const [editedStage, setEditedStage] = useState<TournamentStage | null>(null);

  function onEditStage(stage: TournamentStage) {
    if (stage.type === TournamentStageType.Bracket) {
      dispatch(setBracketEvent(stage));
      setEditedStage(stage);
    }
  }

  function endEditStage() {
    if (!editedStage) return;
    if (editedStage.type === TournamentStageType.Bracket) {
      dispatch(resetBracketEvent());
    }
    setEditedStage(null);
  }

  async function handleSaveTournament() {
    if (!tournament) return;
    await saveTournament(tournament);
  }

  return (
    <>
      {editedStage ? (
        <EditingStage onBack={endEditStage} stage={editedStage} />
      ) : (
        <TournamentEditor
          onEditStage={onEditStage}
          saveTournament={handleSaveTournament}
        />
      )}
    </>
  );
}
