import { useI18n } from "@/features/localization/hooks/useI18n";
import Link from "next/link";

export default function SuccessSentMessage() {
    const { t } = useI18n();

    return (
        <div className="flex flex-col gap-2.5 w-full max-w-sm p-2">
            <h1 className="font-mixed text-xl text-primary">{t('forgot_password_sent_link_title')}</h1>
            <div className="pb-3 text-sm font-mixed text-tertiary">
                {t('forgot_password_sent_successfully')}
            </div>
            <div className='flex items-center justify-center gap-2'>
                <span className='font-mixed text-secondary'>{t('go_to')}</span>
                <Link href='/authenticate/login' className='font-mixed font-bold text-primary hover:underline transition'>
                    {t('login')}
                </Link>
            </div>
        </div>
    )
}
