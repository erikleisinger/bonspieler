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
    <div className="fixed inset-0 grid grid-rows-[auto,1fr] bg-gradient">
      <header className="p-4 bg-glass backdrop-blur-md">
        <Link href="/tournaments">
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
      <div className="relative overflow-hidden">{children}</div>
    </div>
  );
}
