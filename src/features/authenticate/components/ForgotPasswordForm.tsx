import Button from '@/features/shared/components/Button/Button';
import dynamic from 'next/dynamic';
import InputForm from '@/features/shared/components/Input/InputForm';
import Title from '@/features/shared/components/Title/Title';
import SubTitle from '@/features/shared/components/Title/SubTitle';
import { useI18n } from '@/features/localization/hooks/useI18n';
import useFormValidator from '../hooks/useFormValidator';

const Logo = dynamic(() => import('@/features/navbar/components/Logo'), { ssr: false });


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
        <div className="flex flex-col gap-2.5 w-full max-w-xs p-2">
            <Logo className='size-14 self-center' />
            <Title text={t('restore_password')} />
            <SubTitle text={t('forgot_password_description')} />
            
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
                <Button disabled={emailInvalid || isLoading} className={(!emailInvalid && !isLoading) ? 'dark:hover:bg-neutral-500' : ''} onClick={() => forgotPasswordHandler(email)} id='reset-password'>
                    {t('reset_password')}
                </Button>
            </div>
        </div>
    )
}
