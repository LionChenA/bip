import React, { useMemo } from 'react';
import { cn } from '@/lib/utils';

interface TimelineProps {
  items: { pubDate: string | Date; slug: string; title?: string }[];
  activeSlug?: string;
  onSelect?: (slug: string) => void;
}

export function Timeline({ items, activeSlug, onSelect }: TimelineProps) {
  const groups = useMemo(() => {
    const sorted = [...items].sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());
    const grouped: Record<string, Record<string, typeof items>> = {};
    
    sorted.forEach(item => {
      const date = new Date(item.pubDate);
      const year = date.getFullYear().toString();
      const month = date.toLocaleString('default', { month: 'short' });
      const quarter = `Q${Math.ceil((date.getMonth() + 1) / 3)}`;
      
      if (!grouped[year]) grouped[year] = {};
      if (!grouped[year][month]) grouped[year][month] = [];
      grouped[year][month].push(item);
    });
    
    return grouped;
  }, [items]);

  return (
    <nav className="fixed left-0 top-0 h-full w-24 overflow-y-auto pt-20 pb-10 hidden lg:flex flex-col gap-8 border-r border-border pr-4 text-sm">
      {Object.keys(groups).sort((a, b) => Number(b) - Number(a)).map(year => (
        <div key={year} className="flex flex-col gap-2">
          <div className="font-bold text-muted-foreground pl-4">{year}</div>
          {Object.keys(groups[year]).map(month => (
            <div key={month} className="flex flex-col gap-1">
              <div className="text-xs text-muted-foreground uppercase tracking-widest pl-4 mb-1">{month}</div>
              <div className="flex flex-col border-l border-border ml-4 pl-4 gap-1">
                {groups[year][month].map(item => (
                  <a 
                    key={item.slug}
                    href={`/garden/${item.slug}`}
                    onClick={(e) => {
                      if (onSelect) {
                        e.preventDefault();
                        onSelect(item.slug);
                      }
                    }}
                    className={cn(
                      "text-xs truncate transition-colors hover:text-primary block py-0.5",
                      activeSlug === item.slug ? "text-primary font-medium" : "text-muted-foreground"
                    )}
                    title={item.title || item.slug}
                  >
                     {item.title || item.slug} 
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}
    </nav>
  );
}
