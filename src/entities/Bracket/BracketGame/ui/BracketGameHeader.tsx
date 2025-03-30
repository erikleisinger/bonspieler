import { Nullable } from "@/shared/types";
import LoserIndicator from "./LoserIndicator";
export default function BracketGameHeader({
  readableId,
  drawNumber,
  loserTo,
}: {
  readableId: string;
  drawNumber: number;
  loserTo: Nullable<string>;
}) {
  return (
    <div className="flex justify-between">
      <div className="flex gap-2">
        <div className="flex font-bold">{readableId}</div>
      </div>
      <div>
        <LoserIndicator loserTo={loserTo || null} />
      </div>
    </div>
  );
}
