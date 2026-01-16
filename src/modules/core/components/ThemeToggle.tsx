import React, { useEffect, useState } from 'react';
import { FiMonitor, FiMoon, FiSun } from 'react-icons/fi';

type Theme = 'light' | 'dark' | 'system';

export const ThemeToggle = () => {
  const [theme, setTheme] = useState<Theme>('system');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Sync initial state from localStorage
    const saved = localStorage.getItem('theme-preference') as Theme;
    if (saved) setTheme(saved);

    // Listen for changes from other tabs or scripts
    const observer = new MutationObserver(() => {
      const current = document.documentElement.getAttribute('data-theme') as Theme;
      if (current) {
        setTheme((prev) => (prev !== current ? current : prev));
      }
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    return () => observer.disconnect();
  }, []);

  const cycleTheme = () => {
    const sequence: Theme[] = ['system', 'light', 'dark'];
    const nextIndex = (sequence.indexOf(theme) + 1) % sequence.length;
    const newTheme = sequence[nextIndex];

    setTheme(newTheme);

    // Dispatch custom logic implemented in ThemeProvider.astro
    // We update localStorage and DOM classes via the inline script logic
    // But since that script is not a React component, we need to replicate its logic or trigger it
    // The safest way is to manually replicate the applyTheme logic here for immediate feedback

    const effectiveTheme =
      newTheme === 'system'
        ? window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light'
        : newTheme;

    if (effectiveTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme-preference', newTheme);
  };

  if (!mounted) {
    return <div className="w-9 h-9" />; // Prevent hydration mismatch
  }

  return (
    <button
      type="button"
      onClick={cycleTheme}
      className="p-2 rounded-full hover:bg-secondary transition-colors relative overflow-hidden group text-muted-foreground hover:text-foreground"
      aria-label={`Current theme: ${theme}. Click to switch.`}
    >
      <div className="relative z-10">
        {theme === 'light' && <FiSun className="w-5 h-5" />}
        {theme === 'dark' && <FiMoon className="w-5 h-5" />}
        {theme === 'system' && <FiMonitor className="w-5 h-5" />}
      </div>
    </button>
  );
};
