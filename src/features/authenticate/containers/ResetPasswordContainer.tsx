import { useState } from 'react'
import { ResetPasswordForm } from '@/features/authenticate/components/ResetPasswordForm'
import useAuth from '@/features/authenticate/hooks/useAuth';
import Link from 'next/link';
import useHandleError from '@/features/shared/hooks/useHandleError';
import useFormValidator from '@/features/authenticate/hooks/useFormValidator';
import { useI18n } from '@/features/localization/hooks/useI18n';


interface ResetPasswordFormContainerProps {
    token: string
    email: string
}

export default function ResetPasswordFormContainer({ token, email }: ResetPasswordFormContainerProps) {
    const { t } = useI18n();
    const { passwordComparison } = useFormValidator();

    const [newPassword, setNewPassword] = useState('');
    const [newPasswordConfrimation, setNewPasswordConfirmation] = useState('');
    const [success, setSuccess] = useState(false);
    const [errors, setErrors] = useState<string[]>([]);
    const { resetPassword } = useAuth();
    const { hasErrorsResponse } = useHandleError();

    const onNewPasswordChange = (value: string) => {
        setNewPassword(value);
        if (errors.length) setErrors([]);
    }

    const onNewPasswordConfirmationChange = (value: string) => {
        setNewPasswordConfirmation(value);
        if (errors.length) setErrors([]);
    }


    const resetPasswordHandler = async (newPassword: string, newPasswordConfirmation: string) => {
        setErrors([]);
        const validate = passwordComparison(newPassword, newPasswordConfirmation);
        if(validate.length > 0) {
            setErrors(validate);
            return;
        }
        const response = await resetPassword(token, email, newPassword, newPasswordConfirmation);
        if(hasErrorsResponse(response)) {
            setErrors(response.errors!);
        }
        if (response === true) setSuccess(true);
    }



    if (success) {
        return (
            <div className="flex flex-col gap-2.5 w-full max-w-xs p-2">
                <h1 className="rtl:font-noto-sans ltr:font-nunito text-xl dark:text-white">{t('reset_password_successfully')}</h1>
                <div className="pb-3 text-sm rtl:font-noto-sans ltr:font-nunito text-black/70 dark:text-neutral-400">
                    {t('your_password_has_been_reset')}
                    <span className='rtl:font-noto-sans ltr:font-nunito px-1 text-black/70 dark:text-neutral-100'>{t('go_to')}</span>
                    <Link href='/authenticate/login' className='rtl:font-noto-sans ltr:font-nunito text-black/70 dark:text-neutral-100 hover:underline transition'>
                        {t('login')}
                    </Link>
                </div>

                

            </div>
        )
    }


    return (
        <ResetPasswordForm
            newPassword={newPassword}
            setNewPassword={onNewPasswordChange}
            newPasswordConfrimation={newPasswordConfrimation}
            setNewPasswordConfirmation={onNewPasswordConfirmationChange}
            resetPasswordHandler={resetPasswordHandler}
            errors={errors}
        />
    )
}
