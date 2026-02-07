import type React from 'react';
import { useEffect, useState } from 'react';
import { siteConfig } from '@/modules/infra/data/siteConfig';
import { CoordinateNav } from './CoordinateNav';
import { FluxSlogan } from './FluxSlogan';
import { TrailGrid } from './TrailGrid';

export const LandingHero: React.FC = () => {
  const [lang, setLang] = useState<'en' | 'zh'>('zh');

  useEffect(() => {
    const detectedLang = navigator.language.toLowerCase().startsWith('zh') ? 'zh' : 'en';
    setLang(detectedLang);
  }, []);

  const currentSlogan = lang === 'zh' ? siteConfig.slogan.zh : siteConfig.slogan.en;
  const currentTitle = lang === 'zh' ? siteConfig.title.zh : siteConfig.title.en;

  return (
    <section className="relative flex min-h-screen w-full flex-col justify-center overflow-hidden bg-background">
      <TrailGrid />

      <div className="container relative z-10 mx-auto px-6">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 mb-12 flex flex-col items-center text-center">
            <div className="mb-4 font-mono text-[10px] text-primary uppercase tracking-[0.3em]">
              {currentTitle}
            </div>
            <FluxSlogan text={currentSlogan} />
          </div>

          <div className="col-span-12 flex flex-col items-center justify-between gap-12 md:col-span-10 md:col-start-2 md:flex-row">
            <CoordinateNav />

            <div className="hidden max-w-xs text-right md:block">
              <p className="font-sans text-[10px] text-muted-foreground uppercase leading-relaxed tracking-[0.2em]">
                {lang === 'zh' ? siteConfig.bio.zh : siteConfig.bio.en}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Aesthetic Metadata */}
      <div className="absolute bottom-12 left-6 z-10 hidden md:block">
        <div className="origin-left rotate-90 font-mono text-[10px] text-muted-foreground uppercase tracking-[0.3em]">
          Swiss Flux / {lang.toUpperCase()}
        </div>
      </div>
    </section>
  );
};
