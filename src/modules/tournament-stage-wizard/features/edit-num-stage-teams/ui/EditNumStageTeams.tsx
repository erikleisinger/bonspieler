import EditableValue from "@/shared/ui/editable-value";
import NumberInput from "@/shared/ui/number-input";
import { Label } from "@/shared/ui/label";
import Typography from "@/shared/ui/typography";
export default function EditNumStageTeams({
  numTeams,
  setNumTeams,
}: {
  numTeams: number;
  setNumTeams: (newName: number) => void;
}) {
  return (
    <EditableValue
      editingChildren={
        <div className="flex gap-2 items-baseline">
          <NumberInput
            id="stage-wizard-num-teams"
            autoFocus={true}
            hideButtons={true}
            number={numTeams}
            max={32}
            min={2}
            setNumber={setNumTeams}
          ></NumberInput>
          <Label className="font-normal" htmlFor="stage-wizard-num-teams">
            teams
          </Label>
        </div>
      }
    >
      <div className="flex items-baseline gap-2">
        <Typography tag="h4"> {numTeams}</Typography>
        <Label
          className="font-normal cursor-pointer"
          htmlFor="stage-wizard-num-teams"
        >
          teams
        </Label>
      </div>
    </EditableValue>
  );
}
