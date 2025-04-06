import { cn } from "@/lib/utils";

export default function FormatCard({
  selected,
  onClick,
  title,
  description,
  subtitle,
  className,
}: {
  selected: boolean;
  onClick: () => void;
  title: string;
  description?: string;
  subtitle?: string;
  className?: string;
}) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "shadow-md rounded-lg p-4 border-l-4 transition-all group cursor-pointer",
        "border-l-primary-muted hover:border-l-primary   hover:text-primary",
        selected &&
          "bg-primary border-l-primary-muted text-primary-foreground hover:text-primary-foreground hover:border-l-primary-muted",
        className
      )}
    >
      <h4 className="text-[1.2rem] font-bold leading-[1]">{title}</h4>
      <h5 className={cn("text-sm transition-all ")}>{subtitle}</h5>
      <div className={cn("italic text-sm transition-all mt-2 ")}>
        {description}
      </div>
    </div>
  );
}
