import type React from 'react';
import { CoordinateNav } from './CoordinateNav';
import { FluxSlogan } from './FluxSlogan';
import { TrailGrid } from './TrailGrid';

export const LandingHero: React.FC<{ slogan?: string }> = ({
  slogan = 'INTELLECTUAL INFRASTRUCTURE',
}) => {
  return (
    <section className="relative min-h-screen w-full flex flex-col justify-center overflow-hidden bg-background">
      <TrailGrid />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 mb-12">
            <FluxSlogan text={slogan} />
          </div>

          <div className="col-span-12 md:col-start-2 md:col-span-10 flex flex-col md:flex-row justify-between items-end gap-12">
            <CoordinateNav />

            <div className="max-w-xs text-right">
              <p className="font-sans text-xs text-muted-foreground leading-relaxed uppercase tracking-[0.2em]">
                A laboratory for systems thinking, digital gardening, and the pursuit of formal
                elegance in code.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-12 left-6 z-10 hidden md:block">
        <div className="font-mono text-[10px] text-muted-foreground rotate-90 origin-left tracking-[0.3em] uppercase">
          Swiss Flux / v0.1.0
        </div>
      </div>
    </section>
  );
};
