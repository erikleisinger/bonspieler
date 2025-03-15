import { TbTournament } from "react-icons/tb";
import BaseCard from "./BaseCard";
export default function BracketStageCard({ name }: { name?: string }) {
  return (
    <BaseCard
      text={name || "Bracket"}
      className="bg-green-500/30 text-cyan-300"
    >
      <TbTournament />
    </BaseCard>
  );
}
