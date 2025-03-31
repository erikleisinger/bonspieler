import { Button } from "@/shared/ui/button";

export default function BracketEditorToolbarButton({
  active,
  children,
  onClick,
  tooltip,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
  tooltip: string;
}) {
  return (
    <div className="relative group">
      <Button
        onClick={onClick}
        size="icon"
        variant={active ? "default" : "ghost"}
      >
        {children}
      </Button>
      {tooltip && (
        <div className=" font-semibold bg-white/80 px-4 py-1 rounded-sm absolute -right-2 top-0 bottom-0 m-auto h-fit translate-x-[50%] opacity-0 group-hover:opacity-[1]  group-hover:translate-x-[100%]  scale-0 group-hover:scale-100 transition-all duration-200 whitespace-nowrap">
          {tooltip}
        </div>
      )}
    </div>
  );
}
