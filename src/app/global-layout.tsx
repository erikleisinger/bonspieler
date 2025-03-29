"use client";
import "./global-layout.scss";
import { Koulen } from "next/font/google";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SidebarProvider } from "@/shared/ui/sidebar";
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
  const router = useRouter();

  function goToTournaments() {
    router.push("/tournaments");
  }
  return (
    <SidebarProvider>
      <div
        className={`${koulen.variable} fixed inset-0 grid grid-rows-[auto_1fr] bg-gradient `}
      >
        <header className="p-4 bg-glass backdrop-blur-md shadow-md z-50">
          <h1
            onClick={goToTournaments}
            className={cn(
              koulen.className,
              "text-2xl w-fit cursor-pointer m-auto",
              "logo__text"
            )}
          >
            Bonspieler
          </h1>
        </header>
        <div className="relative overflow-hidden z-10">{children}</div>
      </div>
    </SidebarProvider>
  );
}
