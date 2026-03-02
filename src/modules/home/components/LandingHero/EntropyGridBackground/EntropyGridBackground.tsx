'use client';

import type { Container, Engine } from '@tsparticles/engine';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import { useEffect, useMemo, useRef, useState } from 'react';
import { loadEvolutionUpdater } from './EvolutionUpdater';

// Helper to extract theme colors
const getThemeColors = () => {
  if (typeof window === 'undefined') {
    return { foreground: '#888888', primary: '#888888' };
  }

  const isDark = document.documentElement.classList.contains('dark');

  if (isDark) {
    return { foreground: '#ffffff', primary: '#ffffff' };
  } else {
    return { foreground: '#000000', primary: '#000000' };
  }
};

export const EntropyGridBackground = () => {
  const [init, setInit] = useState(false);
  const [colors, setColors] = useState({ foreground: '#888888', primary: '#ffffff' });
  const containerRef = useRef<Container | null>(null);

  // Initialize engine
  useEffect(() => {
    initParticlesEngine(async (engine: Engine) => {
      // Load the slim package (shapes, links, move, life)
      await loadSlim(engine);
      await loadEvolutionUpdater(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  // Theme observer
  useEffect(() => {
    setColors(getThemeColors());

    const observer = new MutationObserver(() => {
      setColors(getThemeColors());
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme', 'class'],
    });

    return () => observer.disconnect();
  }, []);

  const particlesLoaded = async (container?: Container) => {
    if (container) {
      containerRef.current = container;
    }
  };

  // The base global options for the sparse "Entropy Grid" background
  const options = useMemo(() => {
    return {
      autoPlay: true,
      background: {
        color: {
          value: 'transparent',
        },
      },
      fpsLimit: 60,
      interactivity: {
        events: {},
        modes: {
          attract: {
            distance: 800,
            duration: 0.4,
            easing: 'ease-out-expo',
            factor: 8,
            maxSpeed: 50,
            speed: 1,
          },
        },
      },
      particles: {
        color: {
          // Data nodes
          value: colors.foreground,
        },
        links: {
          color: colors.primary,
          distance: 60,
          enable: true,
          opacity: 0.4,
          width: 1.5,
        },
        move: {
          direction: 'none' as const,
          enable: true,
          outModes: {
            default: 'out' as const, // This natively wraps particles around the screen edges in tsparticles
          },
          random: false,
          speed: { min: 1.5, max: 3.5 }, // Faster base movement for more dynamic collisions
          straight: true,
          warp: false, // Fix typescript error by setting boolean instead of object
        },
        number: {
          density: {
            enable: true,
            width: 800,
            height: 800,
          },
          value: 90, // Increased density (1.5x) for a more connected network
        },
        opacity: {
          value: { min: 0.3, max: 0.8 },
          animation: {
            enable: false, // Disabled to allow EvolutionUpdater to control opacity
          },
        },
        shape: {
          type: 'circle', // Reverted to circles as requested
        },
        collisions: {
          enable: false, // Disabled rigid bounce so particles can actually cluster
        },
        size: {
          value: { min: 1, max: 3 },
          animation: {
            enable: false, // Disabled to allow EvolutionUpdater to control size
          },
        },
      },
      detectRetina: true,
      emitters: {
        direction: 'none',
        rate: {
          delay: 0.5,
          quantity: 2,
        },
        position: {
          x: 50,
          y: 50,
        },
        size: {
          width: 100,
          height: 100,
        },
      },
    };
  }, [colors]);

  if (!init) {
    return null; // Don't render until engine is ready
  }

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {/* 
        Removed blur for a sharper, modern tech aesthetic, 
        emphasizing the rigid geometric layout of the particles and links 
      */}
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <Particles
          id="tsparticles-entropy-grid"
          particlesLoaded={particlesLoaded}
          options={options as any}
          className="absolute inset-0"
        />
      </div>
    </div>
  );
};
