import BaseCard from "./BaseCard";
import { TbTableFilled } from "react-icons/tb";
export default function RoundRobinStageCard() {
  return (
    <BaseCard
      text="Pool"
      className="text-amber-500 bg-indigo-500/25 ring-indigo-300"
    >
      <TbTableFilled />
    </BaseCard>
  );
}
