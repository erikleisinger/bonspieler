import { useMemo, useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "@/lib/store";
import type { BracketGameType } from "@/entities/Bracket";
import {
  assignTeamToGame,
  getLookingToAssignTeam,
  getBracketEventOrder,
} from "@/entities/BracketEvent";
import {
  getSelectedDraw,
  setSelectedGame,
  getSelectedGame,
} from "@/widgets/Bracket/BracketViewer";
import { scrollToGame } from "@/entities/Bracket";
import { BracketViewer } from "@/widgets/Bracket/BracketViewer";
import { useBracketEditorToolbarState } from "../lib";
import ViewBracketModalController from "./ViewBracketModalController";
import {
  getLookingForLoserConnection,
  setLookingForLoserConnection,
} from "@/widgets/Bracket/BracketEditor";
import {
  getBracketGames,
  getBracketGamesReadableIdIndex,
  getBracketGamesSchedule,
} from "@/entities/Bracket/BracketGame";
import {
  getOriginConnections,
  setLoserConnectionForGame,
  getLoserConnections,
  getWinnerConnections,
} from "@/entities/Bracket/BracketGameConnections";
import LoadBracketViewOnly from "@/widgets/Bracket/BracketViewer/ui/LoadBracketViewOnly";

import { Nullable } from "@/shared/types";
export default function ViewBracketStageView({ stageId }: { stageId: string }) {
  const { toolbarState, setToolbarState } = useBracketEditorToolbarState();

  return (
    <>
      <div className="grow">
        <LoadBracketViewOnly stageId={stageId} />
      </div>

      <div className="fixed sticky top-0 bottom-0 right-0 z-50 min-w-[500px] overflow-hidden pointer-events-none ">
        <ViewBracketModalController
          state={toolbarState}
          setState={setToolbarState}
        />
      </div>
    </>
  );
}
