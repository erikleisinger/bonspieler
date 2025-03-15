import { Nullable } from "../types";
import Tooltip from "./tooltip";
import { FaExclamationTriangle, FaCheckCircle } from "react-icons/fa";
export default function ValidationIcon({
  errors,
  onlyErrors = false,
}: {
  errors: Nullable<string[]>;
  onlyErrors?: boolean;
}) {
  return errors ? (
    <Tooltip text={errors.join("\n")}>
      <FaExclamationTriangle className="text-destructive text-sm" />
    </Tooltip>
  ) : !onlyErrors ? (
    <FaCheckCircle className="text-success text-sm" />
  ) : (
    <div />
  );
}
