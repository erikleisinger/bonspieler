import { useAppSelector } from "@/lib/store";
import {
  getBracketEventNumTeams,
  getBracketEventNumWinners,
} from "@/entities/BracketEvent";
import { EditStageName } from "@/features/Stage/EditStageName";
import { BracketEventInfo } from "@/entities/BracketEvent";
export default function BracketEventOptions() {
  const numEndTeams = useAppSelector(getBracketEventNumWinners);

  const numStartTeams = useAppSelector(getBracketEventNumTeams);

  return (
    <div className="p-4 grid grid-rows-[auto_1fr] absolute inset-0">
      <header className=" grid grid-cols-[1fr,auto] justify-between mb-4 md:mb-6 pt-2 pl-2 gap-8">
        <EditStageName />
      </header>
      <div className="relative">
        <div className="absolute inset-0 overflow-auto grid grid-rows-[auto_1fr] gap-4">
          <div className="  grid grid-rows-[auto_1fr] gap-4 absolute inset-0">
            <div className="bg-glass p-4 rounded-md">
              <BracketEventInfo
                numStartTeams={numStartTeams}
                numEndTeams={numEndTeams}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
