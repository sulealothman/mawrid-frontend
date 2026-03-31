import Button from '@/features/shared/components/Button/Button';
import InputForm from '@/features/shared/components/Input/InputForm';
import Title from '@/features/shared/components/Title/Title';
import SubTitle from '@/features/shared/components/Title/SubTitle';
import { useI18n } from '@/features/localization/hooks/useI18n';
import useFormValidator from '../hooks/useFormValidator';
import Divider from '@/features/shared/components/Divider';
import LogoTitle from '@/features/navbar/components/LogoTitle';
import Link from 'next/link';

interface ForgotPasswordFormProps {
    email: string;
    onChangeEmail: (email: string) => void;
    forgotPasswordHandler: (email: string) => void;
    emailInvalid: boolean;
    isLoading: boolean;
}

export default function ForgotPasswordForm({
    email,
    onChangeEmail,
    forgotPasswordHandler,
    emailInvalid,
    isLoading
}: ForgotPasswordFormProps) {
    const { t } = useI18n();
    const { inputEmailValidator } = useFormValidator();

    return (
        <div className="flex flex-col gap-2.5 w-full max-w-sm p-2">
            <LogoTitle className='text-3xl justify-center mb-4' logoClassName='size-7' />

            <Title text={t('restore_password')} />
            <SubTitle text={t('forgot_password_description')} />
            <Divider className='border-tertiary mt-1' />

            <InputForm
                label='email'
                testId='email-input'
                placeholder={t('email_placeholder')}
                value={email}
                setValue={onChangeEmail}
                type='email'
                validator={inputEmailValidator}
            />

            <div className='flex flex-col gap-2'>
                <Button disabled={emailInvalid || isLoading} onClick={() => forgotPasswordHandler(email)} id='reset-password' variant='primary'>
                    {t('reset_password')}
                </Button>
            </div>
            <div className="flex items-center justify-center gap-2 font-mixed">
                <span className='text-tertiary'>{t('already_have_an_account')}</span>
                <Link className='text-secondary font-bold' href='/authenticate'>{t('login')}</Link>
            </div>
        </div>
    )
}
