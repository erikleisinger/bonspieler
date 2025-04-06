import { useState } from "react";
import {
  Bracket,
  Brackets,
  BracketRound,
  BracketGame,
} from "@/modules/bracket-manager/widgets/brackets";
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
import {
  BracketDisplaySize,
  BracketGame,
  BracketMode,
} from "@/modules/bracket-manager/shared/types";
import { Button } from "@/shared/ui/button";
import { FaMagic } from "react-icons/fa";
import { cn } from "@/lib/utils";
import { useInitialBracketViewerState } from "../hooks";
import type { Nullable } from "@/shared/types";
export default function BracketViewer({
  bracketClass,
  className,
  editing = false,
  onBack,
  mode,
  providedOnGameClick,
  providedOnBackgroundClick,
  showTitle,
  size,
}: {
  bracketClass?: string;
  className?: string;
  editing?: boolean;
  onBack?: () => void;
  mode: BracketMode;
  providedOnBackgroundClick?: () => void;
  providedOnGameClick?: (game: Nullable<BracketGame>) => boolean;
  showTitle?: boolean;
  size: BracketDisplaySize;
}) {
  const dispatch = useBracketDispatch();
  const brackets = useBracketSelector(getBrackets);

  const { toolbarState, setToolbarState } = useBracketEditorToolbar({
    allow: "all",
  });

  const [wizardMode, setWizardMode] = useState(false);

  useInitialBracketViewerState({
    editing,
    brackets,
    setToolbarState,
    setWizardMode,
  });

  const isLookingForLoserConnection = useBracketSelector(
    getLookingForLoserConnection
  );

  const editingBrackets = useMemo(() => {
    return toolbarState === BracketEditorToolbarState.EditingBrackets;
  }, [toolbarState]);

  const slideoutComponent = useMemo(() => {
    if (!!isLookingForLoserConnection) return null;
    if (toolbarState === BracketEditorToolbarState.ViewingGame) {
      return <BracketGameViewer />;
    }

    return null;
  }, [toolbarState, isLookingForLoserConnection]);

  function onBackgroundClick() {
    if (
      [
        BracketEditorToolbarState.EditingBrackets,
        BracketEditorToolbarState.ViewingEvent,
      ].includes(toolbarState)
    )
      return;
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
      }
      return !isLookingForLoserConnection;
    },
    [isLookingForLoserConnection]
  );

  function afterWizardRender() {
    setWizardMode(false);
    setToolbarState(null);
  }

  const viewMode = useMemo(() => {
    if (toolbarState === BracketEditorToolbarState.ViewingEvent) return "mini";
    return "full";
  }, [toolbarState]);

  return (
    <div className={cn("absolute inset-0 flex", className)}>
      {editing && (
        <BracketEditorToolbar
          state={toolbarState}
          setState={setToolbarState}
          className="sticky top-0 left-0 z-50"
          onBack={onBack}
        />
      )}

      <div className="relative grow">
        <div
          className={cn(
            "absolute bottom-8 right-8 z-50 transition-all duration",
            editingBrackets && !wizardMode
              ? "translate-x-0 opacity-100"
              : "translate-x-full opacity-0 pointer-events-none"
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
          onBackgroundClick={providedOnBackgroundClick || onBackgroundClick}
          onDeleteBracket={onDeleteBracket}
          extendOnGameClick={providedOnGameClick || onGameClick}
          size={size || viewMode}
          mode={mode}
          showTitle={showTitle}
          className={bracketClass}
        ></Brackets>

        <Slideout visible={!!slideoutComponent}>{slideoutComponent}</Slideout>
      </div>
    </div>
  );
}
