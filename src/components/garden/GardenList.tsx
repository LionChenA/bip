import React, { useEffect, useState, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Timeline } from './Timeline';
import { FilterBar } from './FilterBar';
import { NoteItem } from './NoteItem';
import { TOC } from './TOC';

type GardenType = 'evergreen' | 'literature' | 'article' | 'all';

interface GardenItem {
  slug: string;
  title: string;
  description: string;
  pubDate: string;
  type: string;
  lang: string;
}

export function GardenList({ lang = 'en' }: { lang?: string }) {
  const [items, setItems] = useState<GardenItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<GardenItem[]>([]);
  const [filter, setFilter] = useState<GardenType>('all');
  const [expandedSlug, setExpandedSlug] = useState<string | null>(null);
  const [contentCache, setContentCache] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/garden/meta.json')
      .then(res => res.json())
      .then((data: GardenItem[]) => {
        setItems(data.filter(item => item.lang === lang));
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load garden meta', err);
        setLoading(false);
      });
  }, [lang]);

  useEffect(() => {
    if (filter === 'all') {
      setFilteredItems(items);
    } else {
      setFilteredItems(items.filter(i => i.type === filter));
    }
  }, [filter, items]);

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      const match = path.match(/^\/garden\/(.+)$/);
      if (match) {
        setExpandedSlug(match[1]);
      } else {
        setExpandedSlug(null);
      }
    };

    window.addEventListener('popstate', handlePopState);
    
    handlePopState();

    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleExpand = async (slug: string) => {
    setExpandedSlug(slug);
    window.history.pushState({ slug }, '', `/garden/${slug}`);

    if (!contentCache[slug]) {
      try {
        const res = await fetch(`/garden/${slug}.json`);
        const data = await res.json();
        setContentCache(prev => ({ ...prev, [slug]: data.content }));
      } catch (e) {
        console.error('Failed to load content', e);
      }
    }
  };

  const handleCollapse = () => {
    setExpandedSlug(null);
    window.history.pushState(null, '', '/garden');
  };

  const activeItem = expandedSlug ? items.find(i => i.slug === expandedSlug) : null;

  return (
    <div className="flex min-h-screen">
      <Timeline 
        items={items} 
        activeSlug={expandedSlug || undefined} 
      />
      
      <main className="flex-1 lg:ml-24 p-4 md:p-8 max-w-4xl mx-auto">
        <header className="mb-12 pt-20">
          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
            Digital Garden
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            A collection of evolving notes, thoughts, and explorations.
          </p>
          <FilterBar currentFilter={filter} onFilterChange={setFilter} />
        </header>

        {loading ? (
           <div className="space-y-4">
             {[1, 2, 3].map(i => (
               <div key={i} className="h-48 rounded-xl bg-muted/20 animate-pulse" />
             ))}
           </div>
        ) : (
          <div className="space-y-6">
            <AnimatePresence>
              {filteredItems.map(item => (
                <NoteItem
                  key={item.slug}
                  {...item}
                  isExpanded={expandedSlug === item.slug}
                  onExpand={handleExpand}
                  onCollapse={handleCollapse}
                  content={contentCache[item.slug]}
                />
              ))}
            </AnimatePresence>
          </div>
        )}
        
        <AnimatePresence>
          {expandedSlug && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
              onClick={handleCollapse}
            />
          )}
        </AnimatePresence>

        {expandedSlug && contentCache[expandedSlug] && (
          <div className="z-[60] relative">
            <TOC content={contentCache[expandedSlug]} />
          </div>
        )}
      </main>
    </div>
  );
}
