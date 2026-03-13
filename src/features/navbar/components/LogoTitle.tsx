import Logo from './Logo'
import { useI18n } from '@/features/localization/hooks/useI18n';

interface LogoTitleProps {
    className?: string;
    logoClassName?: string;
}

export default function LogoTitle({ className, logoClassName }: LogoTitleProps) {
    const { t } = useI18n();
  return (
    <div className={`flex items-center gap-4 ${className ?? 'text-2xl'}`}>
        <Logo className={logoClassName ?? 'size-5.5'} />
        <span className='font-mixed font-bold text-primary'>{t('app_name')}</span>
    </div>
  )
}
