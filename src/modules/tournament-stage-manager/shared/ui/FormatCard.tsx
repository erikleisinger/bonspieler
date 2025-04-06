import { cn } from "@/lib/utils";

export default function FormatCard({
  selected,
  onClick,
  title,
  description,
  subtitle,
}: {
  selected: boolean;
  onClick: () => void;
  title: string;
  description: string;
  subtitle: string;
}) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "shadow-md rounded-lg p-4 border-l-4 transition-all group cursor-pointer",
        selected
          ? "border-l-indigo-300 bg-indigo-500 text-white"
          : "border-l-indigo-500 hover:border-l-indigo-300   hover:bg-indigo-500 hover:text-white "
      )}
    >
      <h4 className="text-[1.2rem] font-bold leading-[1]">{title}</h4>
      <h5
        className={cn(
          "text-sm transition-all ",
          selected ? "text-white/80" : "text-muted group-hover:text-white/80"
        )}
      >
        {subtitle}
      </h5>
      <div
        className={cn(
          "italic text-sm transition-all mt-2 ",
          selected ? "text-white" : "text-black/50 group-hover:text-white"
        )}
      >
        {description}
      </div>
    </div>
  );
}
