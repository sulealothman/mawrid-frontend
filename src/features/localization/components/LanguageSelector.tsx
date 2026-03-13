import { useI18n } from '@/features/localization/hooks/useI18n';

export const LanguageSelector = () => {
  const { currentLanguage } = useI18n();

  return (
    <div
      className="flex items-center space-x-1 text-primary font-noto-sans-arabic"
    >
      <span>{currentLanguage.flag}</span>
      <span>{currentLanguage.code.toUpperCase()}</span>
    </div>
  );

};