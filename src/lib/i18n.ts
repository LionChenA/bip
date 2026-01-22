import { uiDict } from './i18n/dict';

export type Multilingual = {
  en: string;
  zh: string;
};

export type DictKey = keyof typeof uiDict.en;

export function t(field: Multilingual | string, lang: string = 'zh'): string {
  // Case 1: If field is a multilingual object {en, zh}
  if (typeof field === 'object' && field !== null && 'en' in field && 'zh' in field) {
    return lang === 'zh' ? field.zh : field.en;
  }

  // Case 2: If field is a dictionary key
  const dict = lang === 'zh' ? uiDict.zh : uiDict.en;
  if (typeof field === 'string' && field in dict) {
    return (dict as any)[field];
  }

  // Case 3: Fallback to string itself
  return typeof field === 'string' ? field : '';
}
