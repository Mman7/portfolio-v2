import type { Metadata } from "next";
import { DM_Mono, Inter, Space_Grotesk, Syne } from "next/font/google";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm-mono",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  weight: ["800"],
  variable: "--font-syne",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Eric Man | Full-Stack Developer",
  description:
    "Eric Man is an independent developer and product builder turning ideas into real-world products.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${dmMono.variable} ${syne.variable}`}
    >
      <body className="min-h-screen overflow-x-hidden bg-background font-body text-foreground antialiased selection:bg-foreground selection:text-background">
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
