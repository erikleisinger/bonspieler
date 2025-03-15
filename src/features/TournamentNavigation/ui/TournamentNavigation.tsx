import { Tournament } from "@/shared/types/Tournament";
import Typography from "@/shared/ui/typography";
import { TabsList, TabsTrigger } from "@/shared/ui/tabs";
enum TournamentTab {
  Stages = "stages",
  Teams = "teams",
}
export default function TournamentNavigation({
  tournament,
}: {
  tournament: Tournament;
}) {
  return (
    <header className="bg-glass p-8 flex justify-between">
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
  );
}
