import { Button } from "@/shared/ui/button";
import { FaArrowLeft } from "react-icons/fa";
import { BracketEventHeader } from "@/entities/BracketEvent";
export default function ViewingBracketHeader({
  onBack,
  eventName,
}: {
  onBack: () => void;
  eventName: string;
}) {
  return (
    <BracketEventHeader
      eventName={eventName}
      backButton={
        <Button size="icon" variant="ghost" onClick={onBack}>
          <FaArrowLeft />
        </Button>
      }
    />
  );
}
