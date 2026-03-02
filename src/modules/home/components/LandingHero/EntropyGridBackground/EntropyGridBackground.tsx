'use client';

import type { Container, Engine } from '@tsparticles/engine';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import { useEffect, useMemo, useRef, useState } from 'react';
import { loadEvolutionUpdater } from './EvolutionUpdater';

const getThemeColors = () => {
  if (typeof window === 'undefined') return { foreground: '#888888', primary: '#888888' };
  return document.documentElement.classList.contains('dark')
    ? { foreground: '#ffffff', primary: '#ffffff' }
    : { foreground: '#000000', primary: '#000000' };
};

export const EntropyGridBackground = () => {
  const [init, setInit] = useState(false);
  const [colors, setColors] = useState({ foreground: '#888888', primary: '#ffffff' });
  const containerRef = useRef<Container | null>(null);
  const particlesId = 'global-entropy-particles';

  useEffect(() => {
    if ((window as any)._particlesInit) {
      setInit(true);
      return;
    }

    initParticlesEngine(async (engine: Engine) => {
      await loadSlim(engine);
      await loadEvolutionUpdater(engine);
    }).then(() => {
      (window as any)._particlesInit = true;
      setInit(true);
    });
  }, []);

  useEffect(() => {
    setColors(getThemeColors());
    const observer = new MutationObserver(() => setColors(getThemeColors()));
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme', 'class'],
    });
    return () => observer.disconnect();
  }, []);

  const options = useMemo(
    () => ({
      autoPlay: true,
      fpsLimit: 60,
      fullScreen: { enable: false },
      interactivity: {
        events: { onHover: { enable: true, mode: 'attract' } },
        modes: { attract: { distance: 200, duration: 0.4, factor: 5 } },
      },
      particles: {
        color: { value: colors.foreground },
        links: { color: colors.primary, distance: 60, enable: true, opacity: 0.4, width: 1.5 },
        move: {
          direction: 'none' as const,
          enable: true,
          outModes: { default: 'out' as const },
          speed: { min: 1, max: 2 },
        },
        number: { density: { enable: true, width: 800, height: 800 }, value: 80 },
        opacity: { value: { min: 0.3, max: 0.7 } },
        size: { value: { min: 1, max: 2 } },
      },
      detectRetina: true,
    }),
    [colors]
  );

  if (!init) return null;

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 opacity-40">
        <Particles
          id={particlesId}
          particlesLoaded={async (c) => {
            containerRef.current = c ?? null;
          }}
          options={options as any}
          className="h-full w-full"
        />
      </div>
    </div>
  );
};
