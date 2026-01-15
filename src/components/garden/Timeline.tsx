import React, { useMemo } from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface TimelineProps {
  items: { pubDate: string | Date; slug: string; title?: string }[];
  activeSlug?: string;
  onSelect?: (slug: string) => void;
}

export function Timeline({ items, activeSlug, onSelect }: TimelineProps) {
  const groups = useMemo(() => {
    const sorted = [...items].sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());
    const grouped: Record<string, string[]> = {};
    
    sorted.forEach(item => {
      const date = new Date(item.pubDate);
      const year = date.getFullYear().toString();
      const month = date.toLocaleString('default', { month: 'short' });
      
      if (!grouped[year]) grouped[year] = [];
      if (!grouped[year].includes(month)) grouped[year].push(month);
    });
    
    return grouped;
  }, [items]);

  return (
    <nav className="fixed left-0 top-0 h-full w-32 hidden lg:flex flex-col py-20 pl-6 select-none">
      <div className="relative h-full border-l border-border/40 ml-4">
        <div className="flex flex-col gap-12">
          {Object.keys(groups).sort((a, b) => Number(b) - Number(a)).map(year => (
            <div key={year} className="relative">
              <div className="absolute -left-[17px] top-0 flex items-center">
                <div className="w-2 h-2 rounded-full bg-primary/20 border border-primary/50" />
                <span className="ml-4 text-sm font-bold text-muted-foreground/80 font-mono">{year}</span>
              </div>
              
              <div className="mt-8 flex flex-col gap-6 ml-6 border-l border-border/40 pl-4 py-2">
                {groups[year].map(month => (
                  <div key={month} className="relative group cursor-pointer">
                    <div className="absolute -left-[21px] top-2 w-1.5 h-1.5 rounded-full bg-border group-hover:bg-primary transition-colors" />
                    <span className="text-xs text-muted-foreground/60 group-hover:text-foreground transition-colors uppercase tracking-wider">
                      {month}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
}
