import Typography from "@/shared/ui/typography";
export default function BracketEventHeader({
  appendHeaderChildren,
  backButton,
  eventName,
}: {
  appendHeaderChildren?: React.ReactNode;
  backButton?: React.ReactNode;
  eventName: string;
}) {
  return (
    <header className="flex gap-2 md:gap-4 p-4 md:py-6 items-center bg-primary/5 backdrop-blur-md text-glass-foreground">
      {backButton}
      <Typography tag="h1" className="text-xl md:text-3xl">
        {eventName}
      </Typography>
      {appendHeaderChildren}
    </header>
  );
}
