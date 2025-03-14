import Tooltip from "@/shared/ui/tooltip";
import { FaExclamationTriangle, FaCheckCircle, FaCheck } from "react-icons/fa";
import { DrawTimeValidationContext } from "../lib/DrawTimeValidationContext";
import { useContext } from "react";
export default function DrawTimeValidation({
  drawNumber,
}: {
  drawNumber: number;
}) {
  const { warnings: allWarnings } = useContext(DrawTimeValidationContext);

  const warnings = allWarnings[drawNumber] || "";
  return (
    <>
      {warnings ? (
        <Tooltip text={warnings.join("\n")}>
          <FaExclamationTriangle className="text-destructive text-sm" />
        </Tooltip>
      ) : (
        <FaCheckCircle className="text-success text-sm" />
      )}
    </>
  );
}
