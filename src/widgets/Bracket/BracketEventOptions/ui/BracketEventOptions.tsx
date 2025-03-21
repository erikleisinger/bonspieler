import { useAppSelector } from "@/lib/store";
import {
  getBracketEventBrackets,
  getBracketEventNumWinners,
} from "@/entities/BracketEvent";
import { getBracketEventSchedule } from "@/entities/Bracket/BracketGame";
import { Button } from "@/shared/ui/button";
import { HiOutlinePlus } from "react-icons/hi";
import { EditStageName } from "@/features/Stage/EditStageName";
import { BracketEventInfo } from "@/entities/BracketEvent";
import SaveButton from "@/shared/ui/save-button";
export default function BracketEventOptions({
  onClose,
  onSave,
}: {
  initialTab: string;
  onClose: () => void;
  onSave: () => void;
}) {
  const brackets = useAppSelector(getBracketEventBrackets);
  const schedule = useAppSelector(getBracketEventSchedule);
  const numWinners = useAppSelector(getBracketEventNumWinners);

  return (
    <div className="p-4 grid grid-rows-[auto_1fr_auto] absolute inset-0">
      <header className=" grid grid-cols-[1fr,auto] justify-between mb-4 md:mb-6 pt-2 pl-2 gap-8">
        <EditStageName />
      </header>
      <div className="relative">
        <div className="absolute inset-0 overflow-auto grid grid-rows-[auto_1fr] gap-4">
          <div className="  grid grid-rows-[auto_1fr] gap-4 absolute inset-0">
            <div className="bg-glass p-4 rounded-md">
              <BracketEventInfo
                brackets={brackets}
                schedule={schedule}
                winners={numWinners}
              />
            </div>

            <div className="flex items-end ">
              <div className="w-full flex justify-center">
                <SaveButton onClick={onSave} className="w-[300px]">
                  Save
                </SaveButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
