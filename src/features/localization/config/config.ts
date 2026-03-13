import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import JSON translation files
import en from '@/features/localization/locales/en.json';
import ar from '@/features/localization/locales/ar.json';

const resources = {
  en: {
    translation: en
  },
  ar: {
    translation: ar
  }
};

// Get saved language from localStorage or default to 'en'
// On server-side, always return 'en' to prevent hydration mismatch
// const getStoredLanguage = (): string => {
//   // Always return 'en' during SSR to prevent hydration mismatch
//   if (typeof window === 'undefined') {
//     return 'en';
//   }
  
//   const stored = localStorage.getItem('chatAppLanguage');
//   return stored && ['en', 'es', 'fr', 'ar'].includes(stored) ? stored : 'en';
// };

// Initialize language after component mounts
const initializeLanguage = () => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('chatAppLanguage');
    if (stored && ['en', 'es', 'fr', 'ar'].includes(stored) && stored !== i18n.language) {
      i18n.changeLanguage(stored);
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // Always start with 'en' to prevent hydration mismatch
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    }
  });

// Save language to localStorage when it changes
i18n.on('languageChanged', (lng) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('chatAppLanguage', lng);
  }
});

export default i18n;
export { initializeLanguage };