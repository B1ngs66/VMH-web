import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectPage } from "@/components/ProjectPage";
import { createPageMetadata } from "@/content/metadata";
import { getProject, projectSlugs } from "@/content/projects";

export const dynamicParams = false;

export function generateStaticParams() {
  return projectSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject("en", slug);
  return project ? createPageMetadata({
    locale: "en",
    title: project.title,
    description: project.summary,
    canonical: `/en/projects/${slug}/`,
    zhPath: `/projects/${slug}/`,
    enPath: `/en/projects/${slug}/`,
  }) : {};
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject("en", slug);
  if (!project) notFound();
  return <ProjectPage locale="en" project={project} />;
}
