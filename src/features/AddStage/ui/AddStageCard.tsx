import BaseCard from "@/shared/Tournament/BaseCard";
import { FaPlus } from "react-icons/fa";
export default function AddStageCard({ onClick }: { onClick: () => void }) {
  return (
    <div className="ANIMATED_CARD" onClick={onClick}>
      <BaseCard className="bg-black/20 text-white opacity-[0.3] hover:opacity-[1] transition-all">
        <FaPlus />
      </BaseCard>
    </div>
  );
}
