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
        "text-center px-4 pb-12 pt-6 md:pb-16 md:pt-8  grid grid-rows-[auto,1fr]  w-[90vw] sm:w-[300px] md:w-[350px]  aspect-[4/5]    backdrop-blur-md rounded-3xl cursor-pointer shadow-md border-[1px] border-black/5  " +
          className
      )}
    >
      <div className="p-6  flex justify-center items-center">
        <div className="p-8 md:p-10 rounded-full bg-black/15  backdrop-blur-sm w-fit transition-all group-hover:ring group-hover:ring-inset group-hover:ring-current">
          <div className="text-[6rem] md:text-[6rem]">{children}</div>
        </div>
      </div>
      <div className="flex justify-center items-end w-inherit overflow-hidden ">
        <div className="relative font-bold text-white leading-[1] text-[2rem] md:text-[2.5rem] w-full overflow-hidden min-w-0 w-inherit text-ellipsis ">
          {text}
        </div>
      </div>
    </div>
  );
}
