import { generateBracket } from "@/modules/bracket-manager/widgets/bracket-event-wizard/lib/generateBracket";
import { Brackets } from "@/modules/bracket-manager";
import { useEffect, useState, useRef } from "react";
import { useAppDispatch } from "@/lib/store";
import {
  setBrackets,
  setConnections,
  setBracketStageInfo,
  initBracketEvent,
} from "@/modules/bracket-manager/shared/store";
import { StageContext } from "@/modules/bracket-manager/shared/lib/context";
import { TournamentStageType } from "@/entities/Tournament";
export default function BracketPreview({
  numTeams,
  numWinnersArray,
}: {
  numTeams: number;
  numWinnersArray: number[];
}) {
  const [generatedBracket, setGeneratedBracket] = useState<GeneratedBracket>({
    originConnections: {},
    loserConnections: {},
    winnerConnections: {},
    brackets: [],
  });

  useEffect(() => {
    try {
      const newBracket = generateBracket({
        numTeams,
        numWinners: numWinnersArray,
      });
      setGeneratedBracket(newBracket);
    } catch (e) {
      console.log("uh oh: ", e);
    }
  }, [numTeams, numWinnersArray]);

  const dispatch = useAppDispatch();

  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      dispatch(initBracketEvent({ stageId: "TEMP" }));
      initialized.current = true;
    }

    const { brackets, loserConnections, winnerConnections, originConnections } =
      generatedBracket;

    dispatch(
      setBracketStageInfo({
        stageId: "TEMP",
        name: "TEMP_STAGE",
        type: TournamentStageType.Bracket,
      })
    );
    dispatch(
      setBrackets({
        stageId: "TEMP",
        brackets: brackets,
      })
    );
    dispatch(
      setConnections({
        stageId: "TEMP",
        loserConnections,
        winnerConnections,
        originConnections,
      })
    );
  }, [generatedBracket, dispatch]);

  return (
    <StageContext.Provider value={{ stageId: "TEMP" }}>
      <Brackets size="minimal" mode="connections" className="relative" />
    </StageContext.Provider>
  );
}
