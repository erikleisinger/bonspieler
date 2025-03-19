import { useState, useEffect } from "react";
import Typography from "@/shared/ui/typography";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/shared/ui/tabs";
import { TournamentTab } from "../lib";
import { cn } from "@/lib/utils";
import { useAppSelector } from "@/lib/store";
import { getCurrentTournamentName } from "@/entities/Tournament";
export default function TournamentNavigation({
  children,
  tabsChildren = {
    [TournamentTab.Stages]: <div />,
    [TournamentTab.Teams]: <div />,
  },
}: {
  children?: React.ReactNode;
  tabsChildren: {
    [TournamentTab.Stages]: React.ReactNode;
    [TournamentTab.Teams]: React.ReactNode;
  };
}) {
  const tournamentName = useAppSelector(getCurrentTournamentName);
  function getClassNames(tab: TournamentTab) {
    if (!initialized) {
      return selectedView !== tab ? "z-[1] " : "z-10 ";
    }
    return selectedView !== tab ? "z-[1] behind " : "z-10 ahead ";
  }

  const [selectedView, setSelectedView] = useState("stages");
  const [initialized, setInitialized] = useState(false);

  function handleChangeView(newTab: TournamentTab) {
    if (!initialized) setInitialized(true);
    setSelectedView(newTab);
  }
  return (
    <Tabs
      className="absolute inset-0 grid grid-rows-[auto,1fr,auto]"
      value={selectedView}
      onValueChange={handleChangeView}
    >
      <div className="z-10">
        <header className="relative">
          <div className=" p-4 md:p-2 md:pl-8  text-center md:text-left flex justify-center md:justify-between z-10   items-center relative z-10">
            <Typography tag="h3" className="-mt-1">
              {tournamentName}
            </Typography>
            <TabsList className="h-12 w-[300px] hidden md:flex">
              <TabsTrigger value={TournamentTab.Stages} className="h-full grow">
                Stages
              </TabsTrigger>
              <TabsTrigger value={TournamentTab.Teams} className="h-full grow">
                Teams
              </TabsTrigger>
            </TabsList>
          </div>
          <div className="absolute inset-0 bg-slate-500/5 backdrop-blur-sm z-[3]" />
        </header>
        <nav className="md:hidden flex">
          <TabsList className="h-12  grow mx-2 my-1">
            <TabsTrigger value={TournamentTab.Stages} className="h-full grow">
              Stages
            </TabsTrigger>
            <TabsTrigger value={TournamentTab.Teams} className="h-full grow">
              Teams
            </TabsTrigger>
          </TabsList>
        </nav>
      </div>

      <div
        className="relative z-10"
        style={{
          transformStyle: "preserve-3d",
          perspective: "1000px",
        }}
      >
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
        <div className="absolute inset-0 bg-slate-500/5 backdrop-blur-sm z-[3]" />
      </div>

      <div className="z-10">{children || <div />}</div>
    </Tabs>
  );
}
