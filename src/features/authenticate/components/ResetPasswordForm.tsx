import PasswordInput from '@/features/shared/components/Input/PasswordInput';
import Title from '@/features/shared/components/Title/Title';
import ListErrors from '@/features/shared/components/Box/ListErrors';
import { useI18n } from '@/features/localization/hooks/useI18n';

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
        <div className="flex flex-col gap-3 w-full max-w-xs p-2">
            <Title text={t('reset_password')} />

            <ListErrors errors={errors} />
            
            <div className='flex flex-col gap-2'>
                <label htmlFor="email" className='rtl:font-noto-sans ltr:font-nunito text-black/70 dark:text-neutral-200'>
                    {t('new_password')}
                </label>
                <PasswordInput
                    className="w-full"
                    placeholder={t('new_password_placeholder')}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
            </div>

            <div className='flex flex-col gap-2'>
                <label htmlFor="email" className='rtl:font-noto-sans ltr:font-nunito text-black/70 dark:text-neutral-200'>
                    {t('new_password_confirmation')}
                </label>
                <PasswordInput
                    className="w-full"
                    placeholder={t('new_password_confirmation_placeholder')}
                    value={newPasswordConfrimation}
                    onChange={(e) => setNewPasswordConfirmation(e.target.value)}
                />
            </div>

            <div className='flex flex-col gap-2'>
                <button className='bg-black text-white rounded-lg p-2 rtl:font-noto-sans ltr:font-nunito' onClick={() => resetPasswordHandler(newPassword, newPasswordConfrimation)}>
                    {t('confirm')}
                </button>
            </div>
        </div>
    )
}
