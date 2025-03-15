import "./tournament-card.scss";
import { cn } from "@/lib/utils";
export default function BaseCard({
  className,
  children,
  text = "",
}: {
  className: string;
  children: React.ReactNode;
  text?: string;
}) {
  return (
    <div
      className={cn(
        "group",
        "tournament-card",
        "text-center px-4 py-10 md:py-16  grid grid-rows-[auto,1fr]  w-[400px] aspect-[4/5] max-w-[80vw]   backdrop-blur-md rounded-3xl cursor-pointer shadow-md border-[1px] border-black/5  " +
          className
      )}
    >
      <div className="p-6  flex justify-center items-center">
        <div className="p-8 md:p-10 rounded-full bg-black/15  backdrop-blur-sm w-fit transition-all group-hover:ring group-hover:ring-inset group-hover:ring-current">
          <div className="text-[4rem] md:text-[8rem]">{children}</div>
        </div>
      </div>
      <div className="flex justify-center items-end ">
        <div className="font-bold text-white leading-[1] text-[2rem] md:text-[4rem]">
          {text}
        </div>
      </div>
    </div>
  );
}
