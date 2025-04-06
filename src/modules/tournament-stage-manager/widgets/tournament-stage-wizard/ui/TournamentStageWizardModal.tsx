import { Dialog } from "@/shared/ui/dialog";

import { generateUUID } from "@/shared/utils/generateUUID";

import type { EditedTournamentStage } from "../types";

import { TournamentStageWizard } from "./TournamentStageWizard";
import type { GeneratedStage } from "../types";
const defaultStage = () => ({
  id: generateUUID(),
  name: "New Stage",
  type: null,
  numTeams: 16,
});

export default function TournamentStageWizardModal({
  initialStage = defaultStage(),
  open,
  setOpen,
  onGenerate,
}: {
  initialStage?: EditedTournamentStage;
  open: boolean;
  setOpen: (open: boolean) => void;
  onGenerate: (generatedStage: GeneratedStage) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {open && (
        <TournamentStageWizard
          initialStage={initialStage}
          onGenerate={onGenerate}
        />
      )}
    </Dialog>
  );
}
