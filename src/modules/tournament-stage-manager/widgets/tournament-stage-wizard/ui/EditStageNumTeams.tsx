import EditableValue from "@/shared/ui/editable-value";

import NumberInput from "@/shared/ui/number-input";
import Typography from "@/shared/ui/typography";
import { Label } from "@/shared/ui/label";
import { useRef } from "react";
export default function EditStageNumTeams({
  numTeams,
  setNumTeams,
}: {
  numTeams: number;
  setNumTeams: (num: number) => void;
}) {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <div className="w-fit flex items-baseline gap-4">
      <EditableValue
        inputRef={ref}
        editingChildren={
          <div className="flex gap-2 items-baseline">
            <NumberInput
              ref={ref}
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
    </div>
  );
}
