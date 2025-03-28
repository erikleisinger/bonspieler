import Slideout from "@/shared/ui/slide-out";
import { BracketGameViewer } from "@/widgets/Bracket/BracketGameViewer";
import { useBracketData } from "../helpers";
export default function ViewBracketModalController() {
  const { selectedGame } = useBracketData();

  return (
    <>
      <Slideout fullHeight={true} visible={!!selectedGame?.id}>
        {!!selectedGame?.id && <BracketGameViewer />}
      </Slideout>
    </>
  );
}
