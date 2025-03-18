import SaveButton from "@/shared/ui/save-button";
import { useContext } from "react";
import { DrawTimeValidationContext } from "../lib/DrawTimeValidationContext";
export default function SetterButton({
  className,
  setDrawTimes,
}: {
  className?: string;
  setDrawTimes: () => void;
}) {
  const { warnings } = useContext(DrawTimeValidationContext);
  const hasWarnings = !!Object.values(warnings).flat()?.length;
  return (
    <SaveButton
      className={className}
      disabled={hasWarnings}
      variant={hasWarnings ? "ghost" : "default"}
      text={["Update draw times", "Updating draw times", "Draw times updated!"]}
      onClick={async () => setDrawTimes()}
    >
      Update draw times
    </SaveButton>
  );
}
