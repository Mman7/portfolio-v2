import type { Metadata } from "next";
import { DM_Mono, Inter, Space_Grotesk, Syne } from "next/font/google";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL } from "@/lib/site";
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
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Eric Man | Full-Stack Developer",
    template: "%s | Eric Man",
  },
  description:
    "Eric Man is an independent developer and product builder turning ideas into real-world products.",
  keywords: [
    "Eric Man",
    "full-stack developer",
    "web developer",
    "mobile developer",
    "Next.js",
    "React",
    "Flutter",
    "Malaysia",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_US",
    url: SITE_URL,
    title: "Eric Man | Full-Stack Developer",
    description:
      "Eric Man is an independent developer and product builder turning ideas into real-world products.",
    images: [{ url: DEFAULT_OG_IMAGE, alt: "Eric Man" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Eric Man | Full-Stack Developer",
    description:
      "Eric Man is an independent developer and product builder turning ideas into real-world products.",
    images: [DEFAULT_OG_IMAGE],
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE_NAME,
  url: SITE_URL,
  jobTitle: "Full-Stack Developer",
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
      <body className="min-h-screen bg-background font-body text-foreground antialiased selection:bg-foreground selection:text-background">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <SmoothScroll />
        {/* Clip horizontal overflow here (not on body/html, which mobile browsers still pan) */}
        <div className="overflow-x-clip">{children}</div>
      </body>
    </html>
  );
}
