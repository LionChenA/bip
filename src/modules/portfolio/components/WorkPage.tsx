import React, { useState } from 'react';
import type { CollectionEntry } from 'astro:content';
import { PortfolioTab } from './PortfolioTab';
import { StackTab } from './StackTab';
import { Button } from '@/components/ui/button';

interface WorkPageProps {
  projects: CollectionEntry<'portfolio'>[];
}

export function WorkPage({ projects }: WorkPageProps) {
  const [activeTab, setActiveTab] = useState<'portfolio' | 'stack'>('portfolio');

  return (
    <div className="space-y-12">
       <div className="flex justify-center">
         <div className="flex items-center p-1 bg-muted/50 rounded-full border border-border">
            <Button 
              variant={activeTab === 'portfolio' ? 'default' : 'ghost'} 
              className="rounded-full px-6 h-9 transition-all"
              onClick={() => setActiveTab('portfolio')}
            >
              Portfolio
            </Button>
            <Button 
              variant={activeTab === 'stack' ? 'default' : 'ghost'} 
              className="rounded-full px-6 h-9 transition-all"
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
