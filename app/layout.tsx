import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import FloatingIcon from "@/components/ui/FloatingIcon";
import RootClientLayout from "@/components/sections/RootClientLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CryptoRisk",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen w-full bg-animated-gradient overflow-y-scroll scrollbar scrollbar-thumb-slate-700 scrollbar-track-slate-300">
        <RootClientLayout />
        {children}
      </body>
    </html>
  );
}
