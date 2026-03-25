import { useI18n } from '@/features/localization/hooks/useI18n';
import Button from '../components/Button/Button';

interface ErrorViewProps {
    callbackFunc: () => void;
}

export default function ErrorView({ callbackFunc }: ErrorViewProps) {
    const { t } = useI18n();
    return (
        <div className="w-full max-h-screen flex items-center justify-center">
            <div className="text-center">
                <p className="text-tertiary font-bold text-xl md:text-3xl font-mixed">{t('something_went_wrong_try_again')}</p>
                <Button onClick={callbackFunc} className="mt-4">
                    {t('retry')}
                </Button>
            </div>
        </div>
    )
}
