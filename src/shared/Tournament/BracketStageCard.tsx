import { TbTournament } from "react-icons/tb";
import BaseCard from "./BaseCard";
export default function BracketStageCard({ name }: { name?: string }) {
  return (
    <BaseCard
      text={name || "Bracket"}
      className="text-amber-400 bg-indigo-500/25 ring-indigo-300"
    >
      <TbTournament />
    </BaseCard>
  );
}
