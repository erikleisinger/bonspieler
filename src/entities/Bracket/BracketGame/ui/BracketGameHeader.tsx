import { Nullable } from "@/shared/types";
import LoserIndicator from "./LoserIndicator";
export default function BracketGameHeader({
  readableId,
  drawNumber,
  loserTo,
}: {
  readableId: string;
  drawNumber: string;
  loserTo: Nullable<string>;
}) {
  return (
    <div className="flex justify-between">
      <div className="flex gap-2">
        <div className="flex">{readableId}</div>
        <div className="text-muted">Draw {drawNumber}</div>
      </div>
      <div>
        <LoserIndicator loserTo={loserTo || null} />
      </div>
    </div>
  );
}
