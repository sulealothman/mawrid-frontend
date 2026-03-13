import { useTranslation } from 'react-i18next';

export const useI18n = () => {
  const { t, i18n } = useTranslation();

  const availableLanguages: I18nLanguage[] = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' }
  ];

  const setLanguage = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
  };

  const currentLanguage = availableLanguages.find(
    lang => lang.code === i18n.language
  ) || availableLanguages[0];

  return {
    t,
    setLanguage,
    currentLanguage,
    lang: currentLanguage.code,
    availableLanguages,
    language: i18n.language,
    isRTL: currentLanguage.code === 'ar'
  };
};