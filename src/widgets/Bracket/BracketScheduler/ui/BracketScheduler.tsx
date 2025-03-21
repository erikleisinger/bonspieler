import { useId } from "react";
import { SetEventSheets } from "@/features/SetEventSheets";
import { SetStageDrawTimes } from "@/features/Stage/SetStageDrawTimes";
import { Label } from "@/shared/ui/label";
export default function BracketScheduler() {
  const id = useId();
  return (
    <>
      <div className=" p-4">
        <SetEventSheets />
      </div>
      <div className="mt-4 bg-glass p-4 flex flex-col">
        <header className="flex justify-between items-center">
          <Label htmlFor={id}>Draw schedule</Label>
        </header>
        <div id={id} className="mt-4 flex flex-col gap-2">
          <SetStageDrawTimes />
        </div>
      </div>
    </>
  );
}
