import React from 'react';
import type { CollectionEntry } from 'astro:content';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { ExternalLink, Github } from 'lucide-react';

interface ProjectCardProps {
  project: CollectionEntry<'portfolio'>;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const { title, description, image, tags, link } = project.data;

  return (
    <Card className="flex flex-col h-full overflow-hidden hover:shadow-md transition-shadow">
      {image && (
        <div className="aspect-video w-full overflow-hidden">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" 
          />
        </div>
      )}
      <CardHeader>
        <div className="flex justify-between items-start gap-2">
            <CardTitle className="text-xl">{title}</CardTitle>
            {link && (
              <a href={link} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground">
                <ExternalLink size={18} />
              </a>
            )}
        </div>
        <CardDescription className="line-clamp-2">{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
