import { useI18n } from '@/features/localization/hooks/useI18n';
import Button from '@/features/shared/components/Button/Button';
import { ArrowLeftIcon } from '@/features/shared/icons/CommonIcons';

interface DefaultNavbarProps {
    title: string;
    backHandler: () => void;
}

export default function DefaultNavbar({
    title,
    backHandler
}: DefaultNavbarProps) {
    const {t} = useI18n();
    return (
        <div className='flex items-center justify-between ps-6 md:px-4 py-2 shadow-md dark:shadow-lg'>
                <Button
                    variant='noStyle'
                    onClick={backHandler}
                    className="flex items-center gap-1 max-md:text-sm md:gap-2"
                >
                    <ArrowLeftIcon className="size-4 icon-stroke" viewBox='0 0 24 24' />
                    <span className='font-bold text-secondary'>{t('back')}</span>
                </Button>
                <h1 className='text-center flex-1 text-lg md:text-xl text-primary font-bold font-mixed'>{title}</h1>
                <div className='max-md:w-16' ></div>
        </div>
    )
}
