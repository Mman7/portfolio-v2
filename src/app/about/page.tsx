import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { AboutPage } from "@/features/about/AboutPage";

export const metadata: Metadata = {
  title: "About | Eric Man",
  description:
    "Eric Man is a self-taught full-stack developer from Malaysia. The journey from different paths to building real products.",
};

export default function About() {
  return (
    <>
      <Navbar page="about" />
      <AboutPage />
    </>
  );
}
