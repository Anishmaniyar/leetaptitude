import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "LeetAptitude - Master Aptitude Fast",
  description: "A minimal platform to practice aptitude and track your progress.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-secondary)] antialiased flex flex-col" suppressHydrationWarning>
        <Navbar />

        <main className="flex-1 flex flex-col w-full max-w-[1200px] mx-auto px-4 sm:px-6">
          {children}
        </main>
      </body>
    </html>
  );
}
