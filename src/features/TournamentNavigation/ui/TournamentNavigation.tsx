import { useState } from "react";
import { Tournament } from "@/shared/types/Tournament";
import Typography from "@/shared/ui/typography";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/shared/ui/tabs";
import { TournamentTab } from "../lib";
import { cn } from "@/lib/utils";
import SaveButton from "@/shared/ui/save-button";
export default function TournamentNavigation({
  tabsChildren = {
    [TournamentTab.Stages]: <div />,
    [TournamentTab.Teams]: <div />,
  },
  tournament,
}: {
  tabsChildren: {
    [TournamentTab.Stages]: React.ReactNode;
    [TournamentTab.Teams]: React.ReactNode;
  };
  tournament: Tournament;
}) {
  function getClassNames(tab: TournamentTab) {
    return selectedView !== tab ? "z-[1] behind " : "z-10 ahead ";
  }

  const [selectedView, setSelectedView] = useState("stages");
  return (
    <Tabs
      className="fixed inset-0 grid grid-rows-[auto,1fr,auto]"
      value={selectedView}
      onValueChange={setSelectedView}
    >
      <header className="bg-glass p-8 flex justify-between z-10 backdrop-blur-md shadow-sm">
        <Typography tag="h1">{tournament.name}</Typography>
        <TabsList className="h-12 w-[300px]">
          <TabsTrigger value={TournamentTab.Stages} className="h-full grow">
            Stages
          </TabsTrigger>
          <TabsTrigger value={TournamentTab.Teams} className="h-full grow">
            Teams
          </TabsTrigger>
        </TabsList>
      </header>
      <div
        className="relative"
        style={{
          transformStyle: "preserve-3d",
          perspective: "1000px",
        }}
      >
        <div className="absolute inset-0 bg-slate-500/5 backdrop-blur-sm z-[3]" />
        <TabsContent
          value={TournamentTab.Stages}
          style={{
            transition: "all 0.5s",
          }}
          className={cn(
            "absolute inset-0 transition-all  flex items-center",
            getClassNames(TournamentTab.Stages),
            selectedView === TournamentTab.Stages
              ? "overflow-x-auto overflow-y-hidden"
              : "overflow-x-visible"
          )}
          forceMount={true}
        >
          {tabsChildren[TournamentTab.Stages]}
        </TabsContent>

        <TabsContent
          value={TournamentTab.Teams}
          style={{
            transition: "all 0.5s",
          }}
          className={cn(
            "absolute inset-0 flex items-center",
            getClassNames(TournamentTab.Teams)
          )}
          forceMount={true}
        >
          {tabsChildren[TournamentTab.Teams]}
        </TabsContent>
      </div>
      <footer className="p-4 flex justify-end bg-glass backdrop-blur-md shadow-xl">
        <SaveButton></SaveButton>
      </footer>
    </Tabs>
  );
}
