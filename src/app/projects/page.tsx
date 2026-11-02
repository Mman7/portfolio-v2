import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { ProjectsPage } from "@/features/projects/ProjectsPage";

export const metadata: Metadata = {
  title: "Projects | Eric Man",
  description:
    "Selected products and applications by Eric Man, a full-stack developer building web and mobile experiences.",
};

export default function Projects() {
  return (
    <>
      <Navbar page="projects" />
      <ProjectsPage />
    </>
  );
}
