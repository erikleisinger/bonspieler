import Slideout from "@/shared/ui/slide-out";
import { BracketGameViewer } from "@/widgets/Bracket/BracketGameViewer";
import { useBracketData } from "../helpers";
import {
  BracketEditorToolbarState,
  useBracketEditorToolbarState,
} from "@/widgets/Bracket/BracketEditorToolbar";
import { useAppDispatch } from "@/lib/store";
import { setSelectedGame } from "@/widgets/Bracket/BracketViewer";
import { DestinationConnection } from "@/entities/Bracket/BracketGameConnections";
import { useContext } from "react";
import { BracketContext } from "@/shared/Bracket/BracketContext";
export default function ViewBracketModalController() {
  const { selectedGame } = useBracketData();
  const { toolbarState, setToolbarState } = useBracketEditorToolbarState();

  const { brackets } = useContext(BracketContext);
  const getSelectedGame = (gameId: string) => {
    return brackets
      .flat()
      .flat()
      .find((game) => game.id === gameId);
  };

  const dispatch = useAppDispatch();
  return (
    <>
      <Slideout fullHeight={true} visible={!!selectedGame?.id}>
        {!!selectedGame?.id && (
          <BracketGameViewer
            game={selectedGame}
            onClickConnection={(connection?: DestinationConnection) =>
              dispatch(setSelectedGame(getSelectedGame(connection.gameId)))
            }
          />
        )}
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
