import { TournamentSidebar } from "@/widgets/Tournament/TournamentSidebar";
export default function TournamentLayout({
  children,
  tournamentId,
}: {
  children: React.ReactNode;
  tournamentId: string;
}) {
  return (
    <div className="absolute inset-0 grid grid-cols-[auto_1fr]">
      <TournamentSidebar tournamentId={tournamentId} />
      <div className="relative">
        <div className="absolute inset-0">{children}</div>
      </div>
    </div>
  );
}
