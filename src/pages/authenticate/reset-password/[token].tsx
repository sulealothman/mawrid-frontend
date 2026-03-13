import ResetPasswordFormContainer from '@/features/authenticate/containers/ResetPasswordContainer';
import useUnauthMount from '@/features/authenticate/hooks/useUnauthMount';
import BlankLoading from '@/features/shared/components/Loaders/BlankLoading';
import { useI18n } from '@/features/localization/hooks/useI18n';
import useRedirect from '@/features/shared/hooks/useRedirect';
import Layout from '@/features/shared/layout/LightLayout';
import Heads from '@/features/shared/template/Heads';
import { ReactNode } from 'react'

export default function ResetPassword() {
    const { t } = useI18n();
    const { isReady, query, redirectToAuthenticate } = useRedirect();
    const { isMounted } = useUnauthMount();
    const { token, email } = query;

    if (!isMounted || !isReady) return (<BlankLoading />)

    if (!token || !email) {
        redirectToAuthenticate();
        return <BlankLoading />;
    }


    return (
        <section className="flex w-full flex-col items-center justify-center py-4 px-2">
            <Heads title={t('restore_password')} />
            <ResetPasswordFormContainer token={token as string} email={email as string} />
        </section>
    )
}

ResetPassword.getLayout = (page: ReactNode) => <Layout>{page}</Layout>;