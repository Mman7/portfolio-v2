import { Navbar } from "@/components/layout/Navbar";
import { AboutPage } from "@/features/about/AboutPage";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "About",
  description:
    "Eric Man is a self-taught full-stack developer from Malaysia. The journey from different paths to building real products.",
  path: "/about",
});

export default function About() {
  return (
    <>
      <Navbar page="about" />
      <AboutPage />
    </>
  );
}
