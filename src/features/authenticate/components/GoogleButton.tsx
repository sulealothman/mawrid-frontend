import GoogleIcon from '@/assets/icons/google.svg';
import { useI18n } from '@/features/localization/hooks/useI18n';
import Image from 'next/image';

export default function GoogleButton() {
    const {t} = useI18n();
    return (
        <div className="flex flex-row justify-center items-center gap-2 border dark:border-neutral-600 p-2 rounded-lg">
            <span className="rtl:font-noto-sans ltr:font-nunito dark:text-white/90">{t('login_with')}</span>
            <Image src={GoogleIcon} alt='Login' className="w-6 h-6" />
        </div>
    )
}
