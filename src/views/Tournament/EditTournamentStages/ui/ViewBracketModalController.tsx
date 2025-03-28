import { BracketEditorToolbarState } from "@/widgets/Bracket/BracketEditorToolbar";

import Slideout from "@/shared/ui/slide-out";
import { BracketGameViewer } from "@/widgets/Bracket/BracketGameViewer";
import { useBracketData } from "../helpers";
export default function ViewBracketModalController({
  state,
}: {
  state: BracketEditorToolbarState;
}) {
  const { selectedGame } = useBracketData();

  return (
    <>
      <Slideout
        fullHeight={true}
        visible={state === BracketEditorToolbarState.ViewingGame}
      >
        {state === BracketEditorToolbarState.ViewingGame && selectedGame && (
          <BracketGameViewer />
        )}
      </Slideout>
    </>
  );
}
