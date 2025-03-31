import { Nullable } from "@/shared/types";
import LoserIndicator from "./LoserIndicator";
import { useContext } from "react";
import { BracketContext } from "@/shared/Bracket/BracketContext";
export default function BracketGameHeader({
  loserTo,
  readableId,
}: {
  loserTo: Nullable<string>;
  readableId: string;
}) {
  console.log("r ");
  const { readableIdIndex } = useContext(BracketContext);
  const loserToReadableId = loserTo ? readableIdIndex[loserTo] : null;
  return (
    <div className="flex justify-between">
      <div className="flex gap-2">
        <div className="flex font-bold">{readableId}</div>
      </div>
      <div>
        <LoserIndicator loserTo={loserToReadableId || null} />
      </div>
    </div>
  );
}
