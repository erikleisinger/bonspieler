import BaseCard from "./BaseCard";
import { TbTableFilled } from "react-icons/tb";
export default function RoundRobinStageCard() {
  return (
    <BaseCard text="Pool" className="bg-green-500/30 text-cyan-300">
      <TbTableFilled />
    </BaseCard>
  );
}
