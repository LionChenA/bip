import { AnimatePresence, motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { cn } from '@/lib/utils';

// UNIFIED PHYSICS CONSTANT
const PHYSICS = {
  type: 'spring',
  stiffness: 200,
  damping: 25,
  mass: 1,
} as const;

const UNIFIED_TRANSITION = {
  layout: PHYSICS,
  default: { duration: 0.3, ease: 'easeInOut' },
} as const;

export interface NoteItemProps {
  slug: string;
  title: string;
  description?: string;
  pubDate: string | Date;
  type: string;
  tags?: string[];
  isExpanded: boolean;
  onExpand: (slug: string) => void;
  onCollapse: () => void;
  onHover?: (slug: string) => void;
  content?: string;
  backlinks?: { slug: string; title: string }[];
}

export function NoteItem({
  slug,
  title,
  description,
  pubDate,
  type,
  tags,
  isExpanded,
  onExpand,
  onCollapse,
  onHover,
  content,
  backlinks,
}: NoteItemProps) {
  const [isHovered, setIsHovered] = useState(false);
  const hoverTimer = useRef<NodeJS.Timeout | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (isExpanded) return;
    setIsHovered(true);
    hoverTimer.current = setTimeout(() => {
      onHover?.(slug);
    }, 100);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (hoverTimer.current) {
      clearTimeout(hoverTimer.current);
    }
  };

  return (
    <motion.div
      ref={cardRef}
      tabIndex={isExpanded ? 0 : -1}
      layout
      layoutId={`card-${slug}`}
      transition={UNIFIED_TRANSITION}
      onLayoutAnimationComplete={() => {
        if (isExpanded && cardRef.current) {
          const rect = cardRef.current.getBoundingClientRect();
          if (rect.top < -20) {
            cardRef.current.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
              inline: 'nearest',
            });
          }
        }
      }}
      className={cn(
        'group rounded-xl border bg-card text-card-foreground transition-colors duration-300 relative outline-none',
        isExpanded
          ? 'border-primary/20 shadow-2xl ring-1 ring-primary/5 z-20 my-6 overflow-visible'
          : 'cursor-pointer hover:border-primary/50 hover:shadow-lg active:scale-[0.99] z-0 overflow-hidden'
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => !isExpanded && onExpand(slug)}
    >
      <div className={cn('ease-in-out', isExpanded ? 'py-0 px-5' : 'py-4 px-5')}>
        <motion.div
          layout
          transition={UNIFIED_TRANSITION}
          className={cn(
            'flex justify-between items-start gap-3 z-30',
            isExpanded
              ? 'sticky top-0 bg-card/95 backdrop-blur-md -mx-5 px-5 py-4 border-b border-border/10 rounded-t-xl'
              : 'mb-1'
          )}
        >
          <motion.h3
            layout
            transition={UNIFIED_TRANSITION}
            className={cn(
              'font-bold leading-tight origin-left',
              isExpanded ? 'text-3xl' : 'text-lg group-hover:text-primary'
            )}
          >
            {title}
          </motion.h3>

          {isExpanded && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsHovered(false);
                if (cardRef.current) {
                  const rect = cardRef.current.getBoundingClientRect();
                  if (rect.top < 0 || rect.bottom < 100) {
                    cardRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    setTimeout(() => onCollapse(), 300);
                  } else {
                    onCollapse();
                  }
                } else {
                  onCollapse();
                }
              }}
              className="shrink-0 p-2 rounded-full hover:bg-muted/50 transition-colors -mt-1 -mr-2"
            >
              <span className="text-xs font-mono mr-2 opacity-50 hidden sm:inline">ESC</span>✕
            </motion.button>
          )}
        </motion.div>

        <motion.div
          layout
          transition={UNIFIED_TRANSITION}
          className={cn(
            'flex items-center gap-2 flex-wrap text-[10px] sm:text-xs font-mono text-muted-foreground mb-2'
          )}
        >
          <span className="uppercase tracking-widest text-primary/70">{type}</span>

          {tags && tags.length > 0 && (
            <>
              <span className="w-1 h-1 rounded-full bg-border" />
              <div className="flex gap-2">
                {tags.map((tag) => (
                  <span key={tag} className="opacity-70">
                    #{tag}
                  </span>
                ))}
              </div>
            </>
          )}

          <span className="ml-auto opacity-50">
            {new Date(pubDate).toLocaleDateString(undefined, {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </span>
        </motion.div>

        {isExpanded && (
          <motion.div
            layout
            transition={UNIFIED_TRANSITION}
            initial={{ scaleX: 0, opacity: 0, height: 0, marginTop: 0, marginBottom: 0 }}
            animate={{
              scaleX: 1,
              opacity: 1,
              height: '1px',
              marginTop: '16px',
              marginBottom: '16px',
            }}
            exit={{ scaleX: 0, opacity: 0, height: 0, marginTop: 0, marginBottom: 0 }}
            className="w-full bg-border origin-left"
          />
        )}

        <AnimatePresence>
          {!isExpanded && isHovered && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <p className="text-sm text-muted-foreground line-clamp-2 pb-1 pt-1">{description}</p>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {isExpanded && (
            <motion.div
              key="content-body"
              layout
              transition={UNIFIED_TRANSITION}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              // EXIT ANIMATION FIX:
              // Animate height to 0 to allow the parent container to shrink smoothly.
              // Also animate padding/margin if they were part of the spacing.
              exit={{
                opacity: 0,
                y: 10,
                height: 0,
                marginTop: 0,
                transition: { duration: 0.3, ease: 'easeInOut' }, // Match the general speed
              }}
              className="prose prose-lg dark:prose-invert max-w-none pb-12 overflow-hidden" // overflow-hidden is crucial for height anim
            >
              <div className="text-xl leading-relaxed mb-8 text-muted-foreground italic font-serif border-l-4 border-primary/20 pl-5">
                {description}
              </div>

              {content ? (
                <>
                  {/* biome-ignore lint/security/noDangerouslySetInnerHtml: MDX content is sanitized at build time */}
                  <div dangerouslySetInnerHTML={{ __html: content }} />
                  {backlinks && backlinks.length > 0 && (
                    <div className="mt-12 pt-6 border-t border-border/40">
                      <h4 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4">
                        Backlinks & References
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {backlinks.map((link) => (
                          <button
                            key={link.slug}
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onExpand(link.slug);
                            }}
                            className="text-left p-3 rounded-xl border bg-card/50 hover:bg-card hover:border-primary transition-all group/link"
                          >
                            <span className="text-[10px] font-mono text-muted-foreground block mb-1 uppercase tracking-tight">
                              Referenced In
                            </span>
                            <span className="font-bold text-sm group-hover/link:text-primary transition-colors">
                              {link.title}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex flex-col items-center justify-center p-12 space-y-4">
                  <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  <p className="text-sm text-muted-foreground animate-pulse">
                    Loading garden note...
                  </p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
