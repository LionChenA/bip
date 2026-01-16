import type { CollectionEntry } from 'astro:content';
import { AnimatePresence, motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { stack, type TechItem } from '@/data/stack';

interface StackTabProps {
  projects: CollectionEntry<'portfolio'>[];
}

interface StackStat extends TechItem {
  count: number;
  percentage: number;
}

export function StackTab({ projects }: StackTabProps) {
  const [selectedTechId, setSelectedTechId] = useState<string | null>(null);

  const stats = useMemo(() => {
    // 1. Count usage
    const counts: Record<string, number> = {};
    let maxCount = 0;

    projects.forEach((p) => {
      // Check both tags and stack field for compatibility
      const items = [...(p.data.tags || []), ...(p.data.stack || [])];
      // deduplicate
      const uniqueItems = new Set(items.map((i) => i.toLowerCase()));

      uniqueItems.forEach((item) => {
        counts[item] = (counts[item] || 0) + 1;
        maxCount = Math.max(maxCount, counts[item]);
      });
    });

    // 2. Map to stack definitions
    const result: StackStat[] = Object.values(stack).map((item) => {
      const count = counts[item.id] || 0;
      return {
        ...item,
        count,
        percentage: maxCount > 0 ? (count / maxCount) * 100 : 0,
      };
    });

    // Sort by count desc, then name
    return result.sort((a, b) => b.count - a.count || a.label.localeCompare(b.label));
  }, [projects]);

  const selectedProjects = useMemo(() => {
    if (!selectedTechId) return [];
    return projects.filter((p) => {
      const items = [...(p.data.tags || []), ...(p.data.stack || [])];
      return items.some((t) => t.toLowerCase() === selectedTechId);
    });
  }, [projects, selectedTechId]);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {stats.map((tech) => {
          const Icon = tech.icon;
          const isSelected = selectedTechId === tech.id;

          return (
            <motion.div
              key={tech.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedTechId(isSelected ? null : tech.id)}
              className={`
                cursor-pointer p-4 rounded-xl border transition-colors flex flex-col items-center gap-3
                ${
                  isSelected
                    ? 'border-primary bg-primary/5 ring-2 ring-primary/20'
                    : 'border-border bg-card hover:border-primary/50'
                }
              `}
            >
              <div
                className="p-3 rounded-full bg-muted/50 text-3xl"
                style={{ color: isSelected ? tech.color : 'currentColor' }}
              >
                <Icon />
              </div>
              <div className="text-center">
                <div className="font-medium text-sm">{tech.label}</div>
                {tech.count > 0 && (
                  <div className="text-xs text-muted-foreground mt-1">
                    {tech.count} project{tech.count !== 1 ? 's' : ''}
                  </div>
                )}
              </div>

              {tech.count > 0 && (
                <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden mt-1">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${tech.percentage}%` }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: tech.color }}
                  />
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      <AnimatePresence>
        {selectedTechId && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="p-6 border rounded-xl bg-muted/30"
          >
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              Used in {selectedProjects.length} projects
              <Badge variant="outline">{stack[selectedTechId]?.label}</Badge>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {selectedProjects.map((project) => (
                <a
                  key={project.slug}
                  href={project.data.link || '#'}
                  target={project.data.link ? '_blank' : undefined}
                  className="block group"
                >
                  <Card className="p-4 hover:border-primary/50 transition-colors h-full">
                    <div className="font-medium group-hover:text-primary transition-colors">
                      {project.data.title}
                    </div>
                    <div className="text-sm text-muted-foreground line-clamp-1">
                      {project.data.description}
                    </div>
                  </Card>
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
