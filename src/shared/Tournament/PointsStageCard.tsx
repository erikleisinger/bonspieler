import BaseCard from "./BaseCard";

import { RiSortNumberDesc } from "react-icons/ri";
export default function PointsStageCard() {
  return (
    <BaseCard text="Points" className="text-pink-300 bg-sky-500/90">
      <RiSortNumberDesc />
    </BaseCard>
  );
}
