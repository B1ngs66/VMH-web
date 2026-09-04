import type { Project } from "@/content/projects";

export function ProjectSections({ sections }: { sections: Project["sections"] }) {
  return (
    <div className="project-sections">
      {sections.map((section) => (
        <section className="project-section" key={section.title}>
          <h2>{section.title}</h2>
          <div>
            {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
        </section>
      ))}
    </div>
  );
}
