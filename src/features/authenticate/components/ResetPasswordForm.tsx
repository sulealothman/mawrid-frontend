import Title from '@/features/shared/components/Title/Title';
import ListErrors from '@/features/shared/components/Box/ListErrors';
import { useI18n } from '@/features/localization/hooks/useI18n';
import Button from '@/features/shared/components/Button/Button';
import PasswordInputForm from '@/features/shared/components/Input/PasswordInputForm';
import LogoTitle from '@/features/navbar/components/LogoTitle';
import Divider from '@/features/shared/components/Divider';

interface ResetPasswordFormProps {
    newPassword: string;
    setNewPassword: (newPassword: string) => void;
    newPasswordConfrimation: string;
    setNewPasswordConfirmation: (newPasswordConfirmation: string) => void;
    resetPasswordHandler: (newPassword: string, newPasswordConfirmation: string) => void;
    errors: string[];
}

export const ResetPasswordForm = ({
    newPassword,
    setNewPassword,
    newPasswordConfrimation,
    setNewPasswordConfirmation,
    resetPasswordHandler,
    errors
}: ResetPasswordFormProps) => {
    const { t } = useI18n();

    return (
        <div className="flex flex-col gap-3 w-full max-w-sm p-2">
            <LogoTitle className='text-3xl justify-center mb-4' logoClassName='size-7' />

            <Title text={t('reset_password')} />

            <Divider className='border-tertiary' />


            <ListErrors errors={errors} />

            <PasswordInputForm
                label='new_password'
                testId='new-password-input'
                placeholder={t('new_password_placeholder')}
                password={newPassword}
                setPassword={setNewPassword}
            />

            <PasswordInputForm
                label='new_password_confirmation'
                testId='new-password-confirmation-input'
                placeholder={t('new_password_confirmation_placeholder')}
                password={newPasswordConfrimation}
                setPassword={setNewPasswordConfirmation}
            />

            <div className='flex flex-col gap-2 mt-4'>
                <Button onClick={() => resetPasswordHandler(newPassword, newPasswordConfrimation)} variant='primary'>
                    {t('confirm')}
                </Button>
            </div>
        </div>
    )
}
