import React, { ReactNode } from 'react'
import Layout from '@/features/shared/layout/LightLayout';
import { SignupContainer } from '@/features/authenticate/containers/SignupContainer';
import Heads from '@/features/shared/template/Heads';
import useUnauthMount from '@/features/authenticate/hooks/useUnauthMount';
import BlankLoading from '@/features/shared/components/Loaders/BlankLoading';
import { useI18n } from '@/features/localization/hooks/useI18n';

export default function Index() {
  const { t } = useI18n();
  const {isMounted} = useUnauthMount();

  if(!isMounted) return <BlankLoading />;
  
  return (
    <section className="flex w-full flex-col items-center justify-center py-4 px-2 sm:p-24">
      <Heads title={t('create_a_new_account')} />
      <SignupContainer />
    </section>
  )
}

Index.getLayout = (page: ReactNode) => <Layout>{page}</Layout>;