import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { getProjectPage, projectSlugs } from "@/features/project-detail/data";
import { ProjectDetailPage } from "@/features/project-detail/ProjectDetailPage";
import { pageMetadata } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projectSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = getProjectPage((await params).slug);
  if (!page) return {};
  const description = page.project.summary ?? page.project.description;
  return pageMetadata({
    title: page.project.name,
    description,
    path: `/projects/${(await params).slug}`,
  });
}

async function ProjectContent({ params }: Props) {
  const { slug } = await params;
  const page = getProjectPage(slug);
  if (!page) notFound();

  return <ProjectDetailPage key={slug} {...page} />;
}

export default function ProjectPage({ params }: Props) {
  return (
    <>
      <Navbar page="projects" />
      <Suspense fallback={<main className="min-h-svh" />}>
        <ProjectContent params={params} />
      </Suspense>
    </>
  );
}
