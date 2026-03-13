import { useState } from 'react';
import ForgotPasswordForm from '@/features/authenticate/components/ForgotPasswordForm';
import useAuth from '@/features/authenticate/hooks/useAuth';
import Link from 'next/link';
import { isValidEmail } from "@/features/shared/utils/matches";
import useHandleError from '@/features/shared/hooks/useHandleError';
import { useI18n } from '@/features/localization/hooks/useI18n';


export default function ForgotPasswordFormContainer() {
    const { t } = useI18n();
    const [email, setEmail] = useState('');
    const [success, setSuccess] = useState(false);
    const { forgotPassword, isLoading } = useAuth();
    const { isErrorRequest } = useHandleError();
    const [emailInvalid, setEmailInvalid] = useState(true);

    const onChangeEmail = (value: string) => {
        setEmail(value);
        if (!isValidEmail(value.trim())) {
            setEmailInvalid(true);
        } else {
            setEmailInvalid(false);
        }
    }
    const forgotPasswordHandler = async (email: string) => {
        if (isLoading) return;
        const response = await forgotPassword(email);
        if (!isErrorRequest(response)) setSuccess(true);
    }

    if (success) {
        return (
            <div className="flex flex-col gap-2.5 w-full max-w-xs p-2">
                <h1 className="rtl:font-noto-sans ltr:font-nunito text-xl text-black/70 dark:text-neutral-200">{t('forgot_password_sent_link_title')}</h1>
                <div className="pb-3 text-sm rtl:font-noto-sans ltr:font-nunito text-black/70 dark:text-neutral-200">
                    {t('forgot_password_sent_successfully')}
                </div>
                <div className='flex items-center gap-2'>
                    <span className='rtl:font-noto-sans ltr:font-nunito dark:text-black/70'>{t('go_to')}</span>
                    <Link href='/authenticate/login' className='rtl:font-noto-sans ltr:font-nunito dark:text-black/70'>
                        {t('login')}
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <ForgotPasswordForm
            isLoading={isLoading}
            email={email}
            onChangeEmail={onChangeEmail}
            emailInvalid={emailInvalid}
            forgotPasswordHandler={forgotPasswordHandler}
        />
    )
}
