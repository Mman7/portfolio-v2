import { Navbar } from "@/components/layout/Navbar";
import { ProjectsPage } from "@/features/projects/ProjectsPage";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Projects",
  description:
    "Selected products and applications by Eric Man, a full-stack developer building web and mobile experiences.",
  path: "/projects",
});

export default function Projects() {
  return (
    <>
      <Navbar page="projects" />
      <ProjectsPage />
    </>
  );
}
