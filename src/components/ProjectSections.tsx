"use client";

import { useEffect, useRef } from "react";
import type { Project } from "@/content/projects";

export function ProjectSections({ sections }: { sections: Project["sections"] }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const items = Array.from(container.querySelectorAll<HTMLElement>(".project-section"));
    if (items.length === 0) return;

    const setActive = (activeItem: HTMLElement) => {
      items.forEach((item) => {
        if (item === activeItem) item.setAttribute("data-active", "true");
        else item.removeAttribute("data-active");
      });
    };

    if (!("IntersectionObserver" in window)) {
      setActive(items[0]);
      return;
    }

    const visibility = new Map<Element, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visibility.set(entry.target, entry.isIntersecting ? entry.intersectionRatio : 0);
        });

        const activeItem = items.reduce((best, item) => (
          (visibility.get(item) ?? 0) > (visibility.get(best) ?? 0) ? item : best
        ), items[0]);

        if ((visibility.get(activeItem) ?? 0) > 0) setActive(activeItem);
      },
      {
        rootMargin: "-18% 0px -38% 0px",
        threshold: [0, 0.15, 0.35, 0.6, 0.85],
      },
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="project-sections" ref={containerRef}>
      {sections.map((section, index) => (
        <section className="project-section" data-active={index === 0 ? "true" : undefined} key={section.title}>
          <h2>{section.title}</h2>
          <div>
            {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
        </section>
      ))}
    </div>
  );
}
