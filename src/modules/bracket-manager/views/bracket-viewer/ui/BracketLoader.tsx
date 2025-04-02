import { useLoadBracket } from "@/modules/bracket-manager/shared/hooks";
import LoaderFullPage from "@/shared/ui/loader-full-page";
import { StageContext } from "@/modules/bracket-manager/shared/lib/context";
import BracketViewer from "./BracketViewer";
export default function BracketLoader({
  editing = false,
  stageId,
}: {
  editing?: boolean;
  stageId: string;
}) {
  const { isLoading } = useLoadBracket({ stageId });

  if (isLoading) {
    return <LoaderFullPage />;
  } else {
    return (
      <StageContext.Provider value={{ stageId }}>
        <BracketViewer editing={editing} />
      </StageContext.Provider>
    );
  }
}
