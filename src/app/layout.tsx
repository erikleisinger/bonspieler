import StoreProvider from "@/shared/store/StoreProvider";
import type { Metadata } from "next";
import "./globals.css";
import GlobalLayout from "./global-layout";
export const metadata: Metadata = {
  title: "Bonspieler",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` antialiased `}>
        <StoreProvider>
          <GlobalLayout>{children}</GlobalLayout>
        </StoreProvider>
      </body>
    </html>
  );
}
