import BracketEditorToolbarButton from "./BracketEditorToolbarButton";
import { BracketEditorToolbarState } from "../lib/BracketEditorToolbarState";
import { cn } from "@/lib/utils";
import { FaCog, FaUserFriends, FaCalendarAlt, FaPlus } from "react-icons/fa";
import { TbTournament } from "react-icons/tb";
import { Nullable } from "@/shared/types";
export default function BracketEditorToolbar({
  state,
  setState,
}: {
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
    <div className={cn("py-2 px-4 flex flex-col gap-2")}>
      <>
        {/* <BracketEditorToolbarButton
          onClick={() => handleClick(BracketEditorToolbarState.AddingBracket)}
          active={state === BracketEditorToolbarState.AddingBracket}
          tooltip="Add bracket"
        >
          <FaPlus />
        </BracketEditorToolbarButton> */}
        {/* <BracketEditorToolbarButton
          onClick={() => handleClick(BracketEditorToolbarState.ViewingSchedule)}
          active={state === BracketEditorToolbarState.ViewingSchedule}
          tooltip="Schedule"
        >
          <FaCalendarAlt />
        </BracketEditorToolbarButton> */}

        {/* <BracketEditorToolbarButton
          onClick={() => handleClick(BracketEditorToolbarState.ViewingTeams)}
          active={state === BracketEditorToolbarState.ViewingTeams}
          tooltip="Assign teams"
        >
          <FaUserFriends />
        </BracketEditorToolbarButton> */}
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
