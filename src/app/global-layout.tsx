"use client";
import "./global-layout.scss";
import { Koulen } from "next/font/google";
import { cn } from "@/lib/utils";
import Link from "next/link";
const koulen = Koulen({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-koulen",
});

export default function GlobalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 grid grid-rows-[auto_1fr] bg-gradient ">
      <header className="p-4 bg-glass backdrop-blur-md shadow-md z-50">
        <Link href="/tournaments" className="flex justify-center ">
          <h1
            className={cn(
              koulen.className,
              "text-2xl w-fit cursor-pointer",
              "logo__text"
            )}
          >
            Bonspieler
          </h1>
        </Link>
      </header>
      <div className="relative overflow-hidden z-10">{children}</div>
    </div>
  );
}
