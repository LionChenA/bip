import type { CollectionEntry } from 'astro:content';
import { ProjectCard } from './ProjectCard';

interface PortfolioTabProps {
  projects: CollectionEntry<'portfolio'>[];
}

export function PortfolioTab({ projects }: PortfolioTabProps) {
  if (projects.length === 0) {
    return (
      <div className="py-12 text-center text-muted-foreground">
        <p>No projects found.</p>
      </div>
    );
  }

  return (
    <div className="fade-in slide-in-from-bottom-4 grid animate-in grid-cols-1 gap-6 duration-500 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard key={project.slug} project={project} />
      ))}
    </div>
  );
}
