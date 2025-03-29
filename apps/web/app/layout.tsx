import type { Metadata } from "next";
import { Red_Hat_Display } from "next/font/google";

import "./globals.css";

const redHatDisplay = Red_Hat_Display({subsets: ["latin"]});

export const metadata: Metadata = {
  title: "Cloki: Simplify time tracking",
  description:
    "Simplify time tracking: Effortlessly track absences, remote work, logged hours, and team performance while focusing on growing your business. An AI agent will assist in discussing and approving or rejecting leave requests and provide detailed time reports on demand.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${redHatDisplay.className} text-primaryTextColor`}>{children}</body>
    </html>
  );
}
