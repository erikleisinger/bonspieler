import BracketEditorToolbarButton from "./BracketEditorToolbarButton";
import { BracketEditorToolbarState } from "../types";
import { cn } from "@/lib/utils";
import { FaArrowLeft, FaCog } from "react-icons/fa";
import { TbTournament } from "react-icons/tb";
import { Nullable } from "@/shared/types";
export default function BracketEditorToolbar({
  className,
  onBack,
  state,
  setState,
}: {
  className?: string;
  onBack?: () => void;
  state: BracketEditorToolbarState | null;
  setState: (state: Nullable<BracketEditorToolbarState>) => void;
}) {
  function handleClick(newState: BracketEditorToolbarState) {
    if (state === newState) {
      setState(null);
    } else {
      setState(newState);
    }
  }

  return (
    <div
      className={cn(
        "py-2 px-4 flex flex-col gap-2 bg-glass backdrop-blur-sm shadow-md",
        className
      )}
    >
      <>
        {onBack && (
          <BracketEditorToolbarButton tooltip="Back" onClick={onBack}>
            <FaArrowLeft />
          </BracketEditorToolbarButton>
        )}
        <BracketEditorToolbarButton
          onClick={() => handleClick(BracketEditorToolbarState.EditingBrackets)}
          active={state === BracketEditorToolbarState.EditingBrackets}
          tooltip="Modify Brackets"
        >
          <TbTournament />
        </BracketEditorToolbarButton>
        <BracketEditorToolbarButton
          onClick={() => handleClick(BracketEditorToolbarState.ViewingEvent)}
          active={state === BracketEditorToolbarState.ViewingEvent}
          tooltip="Stage options"
        >
          <FaCog />
        </BracketEditorToolbarButton>
      </>
    </div>
  );
}
