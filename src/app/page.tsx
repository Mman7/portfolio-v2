import { StarfieldIntro } from "@/components/intro/StarfieldIntro";
import { Navbar } from "@/components/layout/Navbar";
import { HomePage } from "@/features/home/HomePage";

export default function Page() {
  return (
    <>
      <StarfieldIntro />
      <Navbar />
      <HomePage />
    </>
  );
}
