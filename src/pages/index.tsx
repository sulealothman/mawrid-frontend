import { useI18n } from '@/features/localization/hooks/useI18n';
import Button from '@/features/shared/components/Button/Button';
import Layout from '@/features/shared/layout/LightLayout';
import { ReactNode } from 'react';
import Logo from '@/features/navbar/components/Logo';
import useRedirect from '@/features/shared/hooks/useRedirect';

export default function Index() {
  const {t} = useI18n();
  const {redirectToAuthenticate} = useRedirect();

  return (
    <div className="font-mixed h-full w-full flex flex-col justify-center items-center overflow-hidden">
      <Logo className="size-32 mb-4 opacity-90" />
      <h1 className='text-secondary text-6xl font-mixed font-semibold'>{t('app_name')}</h1>
      <p className='text-tertiary text-xl font-semibold py-3'>{t('app_description')}</p>
      <div className='py-4'/>
      <Button
        className='px-6'
        variant="primary"
        onClick={() => redirectToAuthenticate()}
      >
        {t('get_started')}
      </Button>
    </div>
  );
}

Index.getLayout = (page: ReactNode) => <Layout>{page}</Layout>;