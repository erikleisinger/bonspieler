import { BracketEventHeader } from "@/entities/BracketEvent";
import { Button } from "@/shared/ui/button";
import SaveButton from "@/shared/ui/save-button";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export default function EditingBracketHeader({
  eventName,
  onBack = null,
  onNext = null,
  onSave = null,
}: {
  eventName: string;
  onBack?: (() => void) | null;
  onNext?: (() => void) | null;
  onSave?: (() => void) | null;
}) {
  return (
    <BracketEventHeader
      eventName={eventName}
      backButton={
        onBack && (
          <Button size="icon" variant="ghost" onClick={onBack}>
            <FaArrowLeft />
          </Button>
        )
      }
      appendHeaderChildren={
        <div className="grow flex justify-end">
          {onNext && (
            <Button size="icon" variant="ghost" onClick={onNext}>
              <FaArrowRight />
            </Button>
          )}
          {onSave && <SaveButton onClick={onSave}></SaveButton>}
        </div>
      }
    ></BracketEventHeader>
  );
}
