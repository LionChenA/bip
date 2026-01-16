import type { CollectionEntry } from 'astro:content';
import React from 'react';
import { ProjectCard } from './ProjectCard';

interface PortfolioTabProps {
  projects: CollectionEntry<'portfolio'>[];
}

export function PortfolioTab({ projects }: PortfolioTabProps) {
  if (projects.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <p>No projects found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {projects.map((project) => (
        <ProjectCard key={project.slug} project={project} />
      ))}
    </div>
  );
}
