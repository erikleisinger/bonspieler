import { TournamentStageType } from "@/entities/Tournament";
import { useMemo } from "react";
import { SelectBracketFormat } from "@/modules/tournament-stage-manager/features/select-bracket-format";

interface StageWizardTab {
    title: string;
    component: React.ReactNode;
}

export function useStageWizardTabs({setTabs, type}: {setTabs: (tabs: StageWizardTab[]) => void; type: TournamentStageType}) {
    const tabs = useMemo(() => {
        if (type === TournamentStageType.Bracket) {
            return [
                {title: 'Format', component: <SelectBracketFormat/>}
            ]
        }
    }, [type])

    return {tabs}
}