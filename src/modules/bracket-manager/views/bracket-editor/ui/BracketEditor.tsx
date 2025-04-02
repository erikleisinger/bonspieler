import { useLoadBracket } from "@/modules/bracket-manager/shared/hooks";
import LoaderFullPage from "@/shared/ui/loader-full-page";
import { StageContext } from "@/modules/bracket-manager/shared/lib/context";
import { Brackets } from "@/modules/bracket-manager/widgets/brackets";
export default function BracketEditor({ stageId }: { stageId: string }) {
  const { isLoading } = useLoadBracket({ stageId });

  if (isLoading) {
    return <LoaderFullPage />;
  } else {
    return (
      <StageContext.Provider value={{ stageId }}>
        <Brackets />
      </StageContext.Provider>
    );
  }
}
