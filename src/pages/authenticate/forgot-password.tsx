import ForgotPasswordFormContainer from '@/features/authenticate/containers/ForgotPasswordContainer';
import useUnauthMount from '@/features/authenticate/hooks/useUnauthMount';
import BlankLoading from '@/features/shared/components/Loaders/BlankLoading';
import { useI18n } from '@/features/localization/hooks/useI18n';
import Layout from '@/features/shared/layout/LightLayout';
import Heads from '@/features/shared/template/Heads';
import React, { ReactNode } from 'react';

export default function ForgotPassword() {

    const { t } = useI18n();
    const {isMounted} = useUnauthMount();

    if(!isMounted) return (<BlankLoading />);
    
    return (
        <section className="flex w-full flex-col items-center justify-center py-4 px-2">
            <Heads title={t('restore_password')} />
              <ForgotPasswordFormContainer />
        </section>
    )
}

ForgotPassword.getLayout = (page: ReactNode) => <Layout>{page}</Layout>;