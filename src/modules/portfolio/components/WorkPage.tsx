import type { CollectionEntry } from 'astro:content';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { PortfolioTab } from './PortfolioTab';
import { StackTab } from './StackTab';

interface WorkPageProps {
  projects: CollectionEntry<'portfolio'>[];
}

export function WorkPage({ projects }: WorkPageProps) {
  const [activeTab, setActiveTab] = useState<'portfolio' | 'stack'>('portfolio');

  return (
    <div className="space-y-12">
      <div className="flex justify-center">
        <div className="flex items-center rounded-full border border-border bg-muted/50 p-1">
          <Button
            variant={activeTab === 'portfolio' ? 'default' : 'ghost'}
            className="h-9 rounded-full px-6 transition-all"
            onClick={() => setActiveTab('portfolio')}
          >
            Portfolio
          </Button>
          <Button
            variant={activeTab === 'stack' ? 'default' : 'ghost'}
            className="h-9 rounded-full px-6 transition-all"
            onClick={() => setActiveTab('stack')}
          >
            Stack & Skills
          </Button>
        </div>
      </div>

      <div className="min-h-[400px]">
        {activeTab === 'portfolio' ? (
          <PortfolioTab projects={projects} />
        ) : (
          <StackTab projects={projects} />
        )}
      </div>
    </div>
  );
}
