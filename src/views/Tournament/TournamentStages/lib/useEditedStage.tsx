import { TournamentStage, TournamentStageType } from "@/entities/Tournament";
import { useAppSelector } from "@/lib/store";
import { getBracketEvent } from "@/entities/BracketEvent";
import { useMemo } from "react";
export default function useEditedStage({ stage }: { stage?: TournamentStage }) {
  const bracketEvent = useAppSelector(getBracketEvent);
  const editedStage = useMemo(() => {
    if (!stage?.type) return null;
    if (stage.type === TournamentStageType.Bracket) {
      return bracketEvent;
    }
    return null;
  }, [stage?.type, bracketEvent]);

  return editedStage;
}
