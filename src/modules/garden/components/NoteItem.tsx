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
        'group relative rounded-xl border bg-card text-card-foreground outline-none transition-colors duration-300',
        isExpanded
          ? 'z-20 my-6 overflow-visible border-primary/20 shadow-2xl ring-1 ring-primary/5'
          : 'z-0 cursor-pointer overflow-hidden hover:border-primary/50 hover:shadow-lg active:scale-[0.99]'
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => !isExpanded && onExpand(slug)}
    >
      <div className={cn('ease-in-out', isExpanded ? 'px-5 py-0' : 'px-5 py-4')}>
        <motion.div
          layout
          transition={UNIFIED_TRANSITION}
          className={cn(
            'z-30 flex items-start justify-between gap-3',
            isExpanded
              ? 'sticky top-0 -mx-5 rounded-t-xl border-border/10 border-b bg-card/95 px-5 py-4 backdrop-blur-md'
              : 'mb-1'
          )}
        >
          <motion.h3
            layout
            transition={UNIFIED_TRANSITION}
            className={cn(
              'origin-left font-bold leading-tight',
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
              className="-mt-1 -mr-2 shrink-0 rounded-full p-2 transition-colors hover:bg-muted/50"
            >
              <span className="mr-2 hidden font-mono text-xs opacity-50 sm:inline">ESC</span>✕
            </motion.button>
          )}
        </motion.div>

        <motion.div
          layout
          transition={UNIFIED_TRANSITION}
          className={cn(
            'mb-2 flex flex-wrap items-center gap-2 font-mono text-[10px] text-muted-foreground sm:text-xs'
          )}
        >
          <span className="text-primary/70 uppercase tracking-widest">{type}</span>

          {tags && tags.length > 0 && (
            <>
              <span className="h-1 w-1 rounded-full bg-border" />
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
            className="w-full origin-left bg-border"
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
              <p className="line-clamp-2 pt-1 pb-1 text-muted-foreground text-sm">{description}</p>
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
              className="prose prose-lg dark:prose-invert max-w-none overflow-hidden pb-12" // overflow-hidden is crucial for height anim
            >
              <div className="mb-8 border-primary/20 border-l-4 pl-5 font-serif text-muted-foreground text-xl italic leading-relaxed">
                {description}
              </div>

              {content ? (
                <>
                  {/* biome-ignore lint/security/noDangerouslySetInnerHtml: MDX content is sanitized at build time */}
                  <div dangerouslySetInnerHTML={{ __html: content }} />
                  {backlinks && backlinks.length > 0 && (
                    <div className="mt-12 border-border/40 border-t pt-6">
                      <h4 className="mb-4 font-bold text-muted-foreground text-sm uppercase tracking-widest">
                        Backlinks & References
                      </h4>
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        {backlinks.map((link) => (
                          <button
                            key={link.slug}
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onExpand(link.slug);
                            }}
                            className="group/link rounded-xl border bg-card/50 p-3 text-left transition-all hover:border-primary hover:bg-card"
                          >
                            <span className="mb-1 block font-mono text-[10px] text-muted-foreground uppercase tracking-tight">
                              Referenced In
                            </span>
                            <span className="font-bold text-sm transition-colors group-hover/link:text-primary">
                              {link.title}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex flex-col items-center justify-center space-y-4 p-12">
                  <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                  <p className="animate-pulse text-muted-foreground text-sm">
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
