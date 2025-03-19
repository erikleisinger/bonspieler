import type { Tournament } from "../types";
export default function TournamentListItem({
  tournament,
}: {
  tournament: Tournament;
}) {
  return (
    <div className="p-2 bg-glass hover:bg-black/5 cursor-pointer">
      {tournament.name}
    </div>
  );
}
