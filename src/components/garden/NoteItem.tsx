import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface NoteItemProps {
  slug: string;
  title: string;
  description?: string;
  pubDate: string | Date;
  type: string;
  isExpanded: boolean;
  onExpand: (slug: string) => void;
  onCollapse: () => void;
  content?: string;
}

export function NoteItem({ 
  slug, 
  title, 
  description, 
  pubDate, 
  type, 
  isExpanded, 
  onExpand, 
  onCollapse,
  content 
}: NoteItemProps) {
  
  return (
    <motion.div
      layoutId={`card-${slug}`}
      className={cn(
        "rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden",
        isExpanded ? "fixed inset-0 z-50 m-4 md:m-12 overflow-y-auto" : "relative hover:shadow-md transition-shadow cursor-pointer"
      )}
      onClick={() => !isExpanded && onExpand(slug)}
    >
      <motion.div className="p-6">
        <motion.div layoutId={`header-${slug}`} className="mb-2">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-mono text-muted-foreground uppercase">{type}</span>
            <span className="text-xs text-muted-foreground">{new Date(pubDate).toLocaleDateString()}</span>
          </div>
          <h3 className={cn("font-bold", isExpanded ? "text-3xl" : "text-xl")}>{title}</h3>
        </motion.div>
        
        <motion.p layoutId={`desc-${slug}`} className="text-muted-foreground mb-4">
          {description}
        </motion.p>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-8 prose dark:prose-invert max-w-none"
            >
              {content ? (
                <div dangerouslySetInnerHTML={{ __html: content }} />
              ) : (
                <div className="flex justify-center p-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              )}
              
              <button 
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onCollapse();
                }}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted"
              >
                ✕
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
