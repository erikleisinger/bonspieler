import { BracketEventHeader } from "@/entities/BracketEvent";
import { Button } from "@/shared/ui/button";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export default function EditingBracketHeader({
  eventName,
  onBack = null,
  onNext = null,
}: {
  eventName: string;
  onBack?: (() => void) | null;
  onNext?: (() => void) | null;
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
        onNext && (
          <Button size="icon" variant="ghost" onClick={onNext}>
            <FaArrowRight />
          </Button>
        )
      }
    ></BracketEventHeader>
  );
}
