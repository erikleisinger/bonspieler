import Slideout from "@/shared/ui/slide-out";
import { BracketGameViewer } from "@/widgets/Bracket/BracketGameViewer";
import { useBracketData } from "../helpers";
import {
  BracketEditorToolbarState,
  useBracketEditorToolbarState,
} from "@/widgets/Bracket/BracketEditorToolbar";
export default function ViewBracketModalController() {
  const { selectedGame } = useBracketData();
  const { toolbarState, setToolbarState } = useBracketEditorToolbarState();
  return (
    <>
      <Slideout fullHeight={true} visible={!!selectedGame?.id}>
        {!!selectedGame?.id && <BracketGameViewer />}
      </Slideout>
      <Slideout
        fullHeight={true}
        visible={
          toolbarState ===
          BracketEditorToolbarState.ViewingInterBracketConnection
        }
      >
        <div>Connection</div>
      </Slideout>
    </>
  );
}
