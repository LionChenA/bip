import React, { useEffect, useRef } from 'react';
import { animate, stagger } from 'animejs';

interface HeroProps {
  title?: string;
  subtitle?: string;
  lang?: string;
}

export const Hero: React.FC<HeroProps> = ({ 
  title = "HELLO, I'M SISYPHUS", 
  subtitle = "Engineer. Builder. Minimalist.",
  lang = "en" 
}) => {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current) return;

    // Grid configuration
    const gridEl = gridRef.current;
    const columns = Math.floor(window.innerWidth / 50);
    const rows = Math.floor(window.innerHeight / 50);
    const total = columns * rows;

    // Clear existing grid
    gridEl.innerHTML = '';
    
    // Create grid items
    for (let i = 0; i < total; i++) {
      const item = document.createElement('div');
      item.classList.add('grid-item');
      item.style.cssText = `
        width: 100%;
        height: 100%;
        border: 1px solid var(--border);
        border-radius: 2px;
        opacity: 0.3;
        transition: opacity 0.3s, background-color 0.3s;
      `;
      gridEl.appendChild(item);
    }

    // Set grid layout styles
    gridEl.style.setProperty('--columns', columns.toString());
    gridEl.style.setProperty('--rows', rows.toString());

    // Stagger animation on load
    animate('.grid-item', {
      scale: [
        { to: 0.1, ease: 'outSine', duration: 500 },
        { to: 1, ease: 'inOutQuad', duration: 1200 }
      ],
      delay: stagger(20, { grid: [columns, rows], from: 'center' }),
      loop: false
    });

    // Interaction handler
    const handleMouseMove = (e: MouseEvent) => {
        // Calculate relative position
        const rect = gridEl.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Find index approximately (simplified for performance)
        const col = Math.floor(x / 50);
        const row = Math.floor(y / 50);
        const index = row * columns + col;
        
        if (index >= 0 && index < total) {
             animate(gridEl.children[index], {
                scale: [
                    { to: 1.5, duration: 100, ease: 'outQuad' },
                    { to: 1, duration: 900, ease: 'outElastic(1, .5)' }
                ],
                backgroundColor: [
                    { to: 'var(--primary)', duration: 100 },
                    { to: 'transparent', duration: 800 }
                ]
            });
            
            animate('.grid-item', {
                scale: 1,
                delay: stagger(50, {grid: [columns, rows], from: index}),
                duration: 400,
                ease: 'outSine'
            });
        }
    };
    
    // Throttled mouse move for performance
    let ticking = false;
    const onMove = (e: MouseEvent) => {
        if(!ticking) {
            window.requestAnimationFrame(() => {
                handleMouseMove(e);
                ticking = false;
            });
            ticking = true;
        }
    }

    window.addEventListener('mousemove', onMove);

    return () => {
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  return (
    <div className="relative w-full h-[80vh] overflow-hidden flex items-center justify-center">
      {/* Background Grid */}
      <div 
        ref={gridRef} 
        className="absolute inset-0 grid gap-1 pointer-events-none z-0"
        style={{
            gridTemplateColumns: 'repeat(var(--columns), 1fr)',
            gridTemplateRows: 'repeat(var(--rows), 1fr)'
        }}
      >
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 text-center pointer-events-none select-none mix-blend-difference text-primary-foreground">
        <h1 className="text-6xl md:text-9xl font-bold tracking-tighter mb-4 animate-in fade-in slide-in-from-bottom-10 duration-1000">
          {title}
        </h1>
        <p className="text-xl md:text-2xl font-mono opacity-80 animate-in fade-in slide-in-from-bottom-5 duration-1000 delay-300">
          {subtitle}
        </p>
      </div>
    </div>
  );
};
