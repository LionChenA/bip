import { aboutDict } from '@/modules/about/data/i18n';
import { infraDict } from '@/modules/infra/data/i18n';

export const uiDict = {
  en: {
    ...infraDict.en,
    ...aboutDict.en,
  },
  zh: {
    ...infraDict.zh,
    ...aboutDict.zh,
  },
};
