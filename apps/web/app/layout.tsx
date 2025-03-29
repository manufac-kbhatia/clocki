import type React from "react"
import "./globals.css"
import { Red_Hat_Display } from "next/font/google"
import { cn } from "@/lib/utils"
import { Metadata } from "next"

const playfair = Red_Hat_Display({
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Cloki: Simplify time tracking",
  description:
    "Simplify time tracking: Effortlessly track absences, remote work, logged hours, and team performance while focusing on growing your business. An AI agent will assist in discussing and approving or rejecting leave requests and provide detailed time reports on demand.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background font-sans antialiased", playfair.className)}>
          {children}
      </body>
    </html>
  )
}
