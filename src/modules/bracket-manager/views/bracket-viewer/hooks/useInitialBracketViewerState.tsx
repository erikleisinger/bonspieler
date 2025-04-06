import { useRef } from "react";
import { BracketEvent } from "@/modules/bracket-manager/shared/types";
import { BracketEditorToolbarState } from "@/modules/bracket-manager/widgets/bracket-editor-toolbar";
export function useInitialBracketViewerState({
  editing,
  brackets,
  setToolbarState,
  setWizardMode,
}: {
  editing?: boolean;
  brackets: BracketEvent;
  setToolbarState: (newState: BracketEditorToolbarState) => void;
  setWizardMode: (bool: boolean) => void;
}) {
  // Using useRef to track if we've already performed this logic
  const initializedRef = useRef(false);

  // Only run this logic once
  if (!initializedRef.current) {
    if (editing && (!brackets || brackets.length === 0)) {
      setToolbarState(BracketEditorToolbarState.EditingBrackets);
      setWizardMode(true);
    }

    initializedRef.current = true;
  }
}
