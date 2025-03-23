"use client";
import { Progress } from "./progress";

export default function LoaderFullPage({ text = "" }: { text?: string }) {
  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-glass backdrop-blur-lg">
      <div className="w-[400px] max-w-[80vw]">
        <div className="relative">
          <Progress indeterminate />
          <div className="font-semibold absolute left-0 right-0 -bottom-4 text-center translate-y-[100%] h-fit">
            {text}
          </div>
        </div>
      </div>
    </div>
  );
}
