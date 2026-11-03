import { StarfieldIntro } from "@/components/intro/StarfieldIntro";
import { Navbar } from "@/components/layout/Navbar";
import { HomePage } from "@/features/home/HomePage";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Full-Stack Developer",
  description:
    "Eric Man is an independent developer and product builder turning ideas into real-world products.",
  path: "/",
});

export default function Page() {
  return (
    <>
      <StarfieldIntro />
      <Navbar />
      <HomePage />
    </>
  );
}
