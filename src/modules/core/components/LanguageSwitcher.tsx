import React from 'react';
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
      className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium rounded-md hover:bg-secondary transition-colors"
      aria-label={`Switch to ${targetLang === 'en' ? 'English' : 'Chinese'}`}
    >
      <IoLanguage className="w-4 h-4" />
      <span>{targetLang.toUpperCase()}</span>
    </a>
  );
};
