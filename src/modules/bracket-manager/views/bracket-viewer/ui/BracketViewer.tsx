import { useState, useEffect } from "react";
import { Brackets } from "@/modules/bracket-manager/widgets/brackets";
import {
  BracketEditorToolbar,
  useBracketEditorToolbar,
  BracketEditorToolbarState,
} from "@/modules/bracket-manager/widgets/bracket-editor-toolbar";
import Slideout from "@/shared/ui/slide-out";
import { BracketGameViewer } from "@/modules/bracket-manager/widgets/bracket-game-viewer";
import { WizardModal } from "@/modules/bracket-manager/widgets/bracket-event-wizard";
import { useCallback, useMemo } from "react";
import {
  useBracketDispatch,
  useBracketSelector,
} from "@/modules/bracket-manager/shared/hooks";
import {
  cancelLookingForLoserConnection,
  getLookingForLoserConnection,
  setLoserConnectionForGame,
} from "@/modules/bracket-manager/shared/store";
import { getBrackets } from "@/modules/bracket-manager/shared/store";
import { BracketGame } from "@/modules/bracket-manager/shared/types";
import { Button } from "@/shared/ui/button";
import { FaMagic } from "react-icons/fa";
import { cn } from "@/lib/utils";
export default function BracketViewer({
  editing = false,
}: {
  editing?: boolean;
}) {
  const dispatch = useBracketDispatch();
  const brackets = useBracketSelector(getBrackets);

  useEffect(() => {
    if (!editing) return;
    if (!!brackets?.length) return;
    setToolbarState(BracketEditorToolbarState.EditingBrackets);
    setWizardMode(true);
  }, []);

  const isLookingForLoserConnection = useBracketSelector(
    getLookingForLoserConnection
  );

  const { toolbarState, setToolbarState } = useBracketEditorToolbar({
    allow: "all",
  });

  const editingBrackets = useMemo(() => {
    return toolbarState === BracketEditorToolbarState.EditingBrackets;
  }, [toolbarState]);

  const [wizardMode, setWizardMode] = useState(false);

  const slideoutComponent = useMemo(() => {
    if (!!isLookingForLoserConnection) return null;
    if (toolbarState === BracketEditorToolbarState.ViewingGame) {
      return <BracketGameViewer />;
    }
    if (toolbarState === BracketEditorToolbarState.ViewingEvent) {
      return <div>Event!</div>;
    }
    return null;
  }, [toolbarState, isLookingForLoserConnection]);

  function onBackgroundClick() {
    if (toolbarState === BracketEditorToolbarState.EditingBrackets) return;
    setToolbarState(null);
    dispatch(cancelLookingForLoserConnection, null);
  }

  const { onAddBracket, onDeleteBracket } = useMemo(() => {
    if (toolbarState === BracketEditorToolbarState.EditingBrackets) {
      return {
        onAddBracket: () => {},
        onDeleteBracket: () => {},
      };
    }
    return {
      onAddBracket: null,
      onDeleteBracket: null,
    };
  }, [toolbarState]);

  const onGameClick = useCallback(
    (game: BracketGame) => {
      if (isLookingForLoserConnection) {
        const { id: originGameId } = isLookingForLoserConnection;
        const { id: destinationGameId } = game;
        dispatch(setLoserConnectionForGame, {
          originGameId,
          destinationGameId,
        });
        console.log("game: ", game);
      }
      return !isLookingForLoserConnection;
    },
    [isLookingForLoserConnection]
  );

  function afterWizardRender() {
    setWizardMode(false);
    setToolbarState(null);
  }

  return (
    <div className="absolute inset-0 flex">
      {editing && (
        <BracketEditorToolbar
          state={toolbarState}
          setState={setToolbarState}
          className="sticky top-0 left-0 z-50"
        />
      )}

      <div className="relative grow">
        <div
          className={cn(
            "absolute bottom-8 right-8 z-50 transition-all duration",
            editingBrackets && !wizardMode
              ? "translate-x-0 opacity-100"
              : "translate-x-full opacity-0"
          )}
        >
          <Button
            size="lg"
            className=" shadow-sm"
            onClick={() => setWizardMode(true)}
          >
            <FaMagic /> Generate Bracket
          </Button>
        </div>

        <WizardModal
          open={wizardMode}
          setOpen={setWizardMode}
          onRender={afterWizardRender}
        />
        <Brackets
          onAddBracket={onAddBracket}
          onBackgroundClick={onBackgroundClick}
          onDeleteBracket={onDeleteBracket}
          extendOnGameClick={onGameClick}
        ></Brackets>

        <Slideout visible={!!slideoutComponent}>{slideoutComponent}</Slideout>
      </div>
    </div>
  );
}
