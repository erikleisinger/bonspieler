import { useState } from "react";
import { useRouter, useParams } from "next/navigation";

/* Types & enums */

import {
  TournamentStageType,
  type TournamentStage,
} from "@/entities/Tournament";

/* Store */

import { useAppDispatch, useAppSelector } from "@/lib/store";
import { getCurrentTournament } from "@/entities/Tournament";
import { resetBracket, setBracketEvent } from "@/entities/BracketEvent";

import { initBracketConnections } from "@/entities/Bracket/BracketGameConnections";
import { initBracketGames } from "@/entities/Bracket/BracketGame";
import { initDrawTimesForStage } from "@/entities/DrawTime";
/* Components */

import { TournamentEditor } from "@/widgets/Tournament/TournamentEditor";
import { TournamentInfo } from "@/widgets/Tournament/TournamentInfo";
import { TournamentOptions } from "@/widgets/Tournament/TournamentOptions";
import { TournamentStageEditor } from "@/widgets/Tournament/TournamentStageEditor";
import EditingStage from "./EditingStage";

/* Utils */
import { saveTournament } from "../lib";
import { EditTournamentName } from "@/features/Tournament/EditTournamentName";
import Typography from "@/shared/ui/typography";

export default function EditTournament() {
  const router = useRouter();

  const dispatch = useAppDispatch();
  const tournament = useAppSelector(getCurrentTournament);

  const [editedStage, setEditedStage] = useState<TournamentStage | null>(null);

  const params = useParams();
  async function onEditStage(stage: TournamentStage) {
    if (stage.type === TournamentStageType.Bracket) {
      router.push(
        `/tournaments/${params.tournamentId}/stages/brackets/${stage.id}/edit/`
      );
      // await dispatch(initBracketGames(stage.id));
      // await dispatch(initBracketConnections(stage.id));
      // await dispatch(setBracketEvent(stage));
      // await dispatch(initDrawTimesForStage(stage.id));
    }
  }

  function endEditStage() {
    if (!editedStage) return;
    if (editedStage.type === TournamentStageType.Bracket) {
      dispatch(resetBracket());
    }
    setEditedStage(null);
  }

  async function handleSaveTournament() {
    if (!tournament) return;
    await saveTournament(tournament);
  }

  return (
    <div className="h-full grid grid-cols-1 absolute inset-0 p-8 overflow-auto">
      <div className="relative h-full w-full">
        <div className="bg-glass p-6 rounded-2xl w-fit backdrop-blur-md shadow-sm">
          <Typography tag="h3">Schedule</Typography>
          <TournamentOptions />
        </div>
        <div className="bg-glass p-6 rounded-2xl w-fit backdrop-blur-md shadow-sm">
          <Typography tag="h3">Stages</Typography>
          <TournamentStageEditor onEditStage={onEditStage} />
        </div>
      </div>
    </div>
  );
}
