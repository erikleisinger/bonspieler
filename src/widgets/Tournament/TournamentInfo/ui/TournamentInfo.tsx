import type { Tournament } from "@/entities/Tournament";
import Typography from "@/shared/ui/typography";
import SaveButton from "@/shared/ui/save-button";
export default function TournamentInfo({
  children,
  nameChild,
  onSave,
  tournament,
}: {
  children: React.ReactNode;
  nameChild?: React.ReactNode;
  onSave: () => void;
  tournament: Tournament;
}) {
  return (
    <div className="p-4 grid grid-rows-[auto,1fr,auto] ">
      <header>
        <Typography tag="overline">Tournament</Typography>
        {nameChild ? (
          nameChild
        ) : (
          <Typography tag="h3" className="leading-[1]">
            {tournament.name}
          </Typography>
        )}
      </header>
      <main>{children}</main>

      <footer>
        {onSave && (
          <SaveButton
            text={["Save tournament", "Saving...", "Tournament saved"]}
            onClick={onSave}
          />
        )}
      </footer>
    </div>
  );
}
