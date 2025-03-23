import type { Tournament } from "../types";
import Typography from "@/shared/ui/typography";
export default function TournamentListItem({
  tournament,
}: {
  tournament: Tournament;
}) {
  return (
    <div className="p-2 bg-glass hover:bg-black/5 cursor-pointer">
      <Typography tag="overline">{tournament.id}</Typography>
      <Typography tag="h4">{tournament.name}</Typography>
    </div>
  );
}
