/* Types & enums*/

import {
  type TournamentStage,
  TournamentStageType,
} from "@/entities/Tournament";

/* Components */

import EditingBracket from "./EditingBracket";

export default function EditingStage({
  onBack,
  stage,
}: {
  onBack: () => void;
  stage: TournamentStage;
}) {
  const isBracket = stage.type === TournamentStageType.Bracket;
  return <>{isBracket && <EditingBracket onEndView={onBack} />}</>;
}
