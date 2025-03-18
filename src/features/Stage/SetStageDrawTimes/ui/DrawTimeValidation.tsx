import { DrawTimeValidationContext } from "../lib/DrawTimeValidationContext";
import ValidationIcon from "@/shared/ui/validation-icon";
import { useContext } from "react";
export default function DrawTimeValidation({
  drawNumber,
}: {
  drawNumber: number;
}) {
  const { warnings: allWarnings } = useContext(DrawTimeValidationContext);

  const warnings = allWarnings[drawNumber] || "";
  return <ValidationIcon errors={warnings} />;
}
