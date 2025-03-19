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
        <GlobalLayout>{children}</GlobalLayout>
      </body>
    </html>
  );
}
