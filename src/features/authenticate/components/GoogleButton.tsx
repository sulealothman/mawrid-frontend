import GoogleIcon from '@/assets/icons/google.svg';
import { useI18n } from '@/features/localization/hooks/useI18n';
import Image from 'next/image';

export default function GoogleButton() {
    const { t } = useI18n();
    return (
        <div
        className="flex flex-row justify-center items-center gap-2 border border-tertiary dark:border-none shadow-sm shadow-light-400 dark:shadow-midnight-800 rounded-lg py-2 cursor-pointer"
        >
            <span className="font-mixed text-primary">{t('login_with')}</span>
            <Image src={GoogleIcon} alt='Login' className="size-6" />
        </div>
    )
}
