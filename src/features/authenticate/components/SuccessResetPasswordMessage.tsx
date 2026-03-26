import { useI18n } from '@/features/localization/hooks/useI18n';
import Link from 'next/link';

export default function SuccessResetPasswordMessage() {
    const { t } = useI18n();
    return (
        <div className="flex flex-col gap-2.5 w-full max-w-xs p-2">
            <h1 className="font-mixed text-xl text-primary">{t('reset_password_successfully')}</h1>
            <div className="pb-3 text-sm font-mixed text-tertiary">
                {t('your_password_has_been_reset')}
                <span className='font-mixed px-1 text-secondary'>{t('go_to')}</span>
                <Link href='/authenticate/login' className='font-mixed font-bold text-primary hover:underline transition'>
                    {t('login')}
                </Link>
            </div>
        </div>
    )
}
