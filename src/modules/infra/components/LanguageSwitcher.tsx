import type React from 'react';
import { IoLanguage } from 'react-icons/io5';

interface LanguageSwitcherProps {
  currentLang: string;
  currentPath: string;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ currentLang, currentPath }) => {
  const targetLang = currentLang === 'en' ? 'zh' : 'en';
  const targetPath = currentPath.replace(`/${currentLang}`, `/${targetLang}`);

  return (
    <a
      href={targetPath}
      className="flex items-center gap-1 rounded-md px-3 py-1.5 font-medium text-sm transition-colors hover:bg-secondary"
      aria-label={`Switch to ${targetLang === 'en' ? 'English' : 'Chinese'}`}
    >
      <IoLanguage className="h-4 w-4" />
      <span>{targetLang.toUpperCase()}</span>
    </a>
  );
};
