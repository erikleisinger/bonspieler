import BaseCard from "@/shared/Tournament/BaseCard";

import LoadingSpinner from "@/shared/ui/loading-spinner";
export default function AddStageCardLoading() {
  return (
    <div className="ANIMATED_CARD">
      <BaseCard className="bg-black/20 text-white opacity-[0.3] hover:opacity-[1] transition-all">
        <LoadingSpinner className="h-[6rem] w-[6rem]" />
      </BaseCard>
    </div>
  );
}
