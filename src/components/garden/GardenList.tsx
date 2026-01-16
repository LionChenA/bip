import React, { useEffect, useState, useRef, useCallback } from 'react';
import { AnimatePresence, motion, LayoutGroup } from 'framer-motion'; // Added LayoutGroup
import { SVGTimeline } from './SVGTimeline';
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
  tags?: string[];
}

export interface GardenListProps {
  lang?: string;
  initialPosts?: GardenItem[];
  initialSlug?: string;
  initialContent?: { content: string, backlinks?: any[] };
}

export function GardenList({ 
  lang = 'en',
  initialPosts = [],
  initialSlug,
  initialContent
}: GardenListProps) {
  const [items, setItems] = useState<GardenItem[]>(initialPosts);
  const [filteredItems, setFilteredItems] = useState<GardenItem[]>([]);
  const [filter, setFilter] = useState<GardenType>('all');
  const [expandedSlug, setExpandedSlug] = useState<string | null>(initialSlug || null);
  const [contentCache, setContentCache] = useState<Record<string, { content: string, backlinks?: any[] }>>(
    initialSlug && initialContent ? { [initialSlug]: initialContent } : {}
  );
  const [loading, setLoading] = useState(initialPosts.length === 0);

  // Load Metadata if not provided
  useEffect(() => {
    if (initialPosts.length > 0) return;
    
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
  }, [lang, initialPosts]);

  // Filter Logic
  useEffect(() => {
    if (filter === 'all') {
      setFilteredItems(items);
    } else {
      setFilteredItems(items.filter(i => i.type === filter));
    }
  }, [filter, items]);

  // Preload Content on Hover
  const handleHover = async (slug: string) => {
    if (!contentCache[slug]) {
      try {
        const res = await fetch(`/garden/${slug}.json`);
        const data = await res.json();
        setContentCache(prev => ({ ...prev, [slug]: { content: data.content, backlinks: data.backlinks } }));
      } catch (e) {
      }
    }
  };

  const handleExpand = async (slug: string) => {
    if (expandedSlug === slug) {
      handleCollapse(slug); // Pass slug for scroll calculation
      return;
    }

    setExpandedSlug(slug);
    window.history.pushState({ slug }, '', `/${lang}/garden/${slug}`);

    if (!contentCache[slug]) {
      try {
        const res = await fetch(`/garden/${slug}.json`);
        const data = await res.json();
        setContentCache(prev => ({ ...prev, [slug]: { content: data.content, backlinks: data.backlinks } }));
      } catch (e) {
        console.error('Failed to load content', e);
      }
    }
  };

  // The Elevator Effect Logic: Scroll back if deep in content
  const handleCollapse = useCallback((slug?: string) => {
    // If we have a specific slug (clicked close button), we can try to be smart about scrolling
    // But mostly, just collapsing state is enough as NoteItem handles the cleanup
    setExpandedSlug(null);
    window.history.pushState(null, '', `/${lang}/garden`);
  }, [lang]);

  // Popstate Handler
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      const match = path.match(new RegExp(`^/${lang}/garden/(.+)$`));
      if (match) {
        setExpandedSlug(match[1]);
      } else {
        setExpandedSlug(null);
      }
    };

    window.addEventListener('popstate', handlePopState);
    handlePopState();
    return () => window.removeEventListener('popstate', handlePopState);
  }, [lang]);

  // Global ESC Handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && expandedSlug) {
        handleCollapse();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [expandedSlug, handleCollapse]); 

  return (
    <div className="flex min-h-screen">
      <SVGTimeline 
        items={items} 
        activeSlug={expandedSlug || undefined} 
      />
      
      <main className="flex-1 lg:ml-24 p-4 md:p-8 max-w-4xl mx-auto">
        <header className="mb-10 pt-20">
          <h1 className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
            Digital Garden
          </h1>
          <p className="text-xl text-muted-foreground mb-6">
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
             <div className="flex flex-col gap-4 pb-32">
              <LayoutGroup> {/* The Physics Field: Coordinates sibling movement */}
                {filteredItems.map(item => (
                  <NoteItem
                    key={item.slug}
                    {...item}
                    isExpanded={expandedSlug === item.slug}
                    onExpand={handleExpand}
                    onCollapse={() => handleCollapse(item.slug)}
                    onHover={handleHover}
                    content={contentCache[item.slug]?.content}
                    backlinks={contentCache[item.slug]?.backlinks}
                  />
                ))}
              </LayoutGroup>
            </div>
          </div>
        )}
        
        <AnimatePresence>
          {expandedSlug && contentCache[expandedSlug] && (
            <div className="z-[60] relative">
              <TOC content={contentCache[expandedSlug].content} />
            </div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
