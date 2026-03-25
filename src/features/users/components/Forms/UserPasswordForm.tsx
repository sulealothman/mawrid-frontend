import { useI18n } from '@/features/localization/hooks/useI18n';
import Button from '@/features/shared/components/Button/Button';
import PasswordInput from '@/features/shared/components/Input/PasswordInput';


interface UserPasswordFormProps {
  currentPassword: string;
  setCurrentPassword: (value: string) => void;
  newPassword: string;
  setNewPassword: (value: string) => void;
  confirmNewPassword: string;
  setConfirmNewPassword: (value: string) => void;
  onSubmit: () => void;
}

export default function UserPasswordForm({
  currentPassword,
  setCurrentPassword,
  newPassword,
  setNewPassword,
  confirmNewPassword,
  setConfirmNewPassword,
  onSubmit,
}: UserPasswordFormProps) {
  const { t } = useI18n();
  return (
    <div className='flex flex-col gap-2 rounded-xl px-4 py-4 w-full bg-accent shadow-md border border-secondary'>
      <h2 className='font-semibold text-lg font-mixed text-primary'>{t('change_password')}</h2>
      <div className='flex flex-col gap-1'>
        <label htmlFor="currentPassword" className='label-form'>{t('current_password')}</label>
        <PasswordInput
          id="currentPassword"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />

      </div>
      <div className='flex flex-col gap-1'>
        <label htmlFor="newPassword" className='label-form'>{t('new_password')}</label>
        <PasswordInput
          id="newPassword"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>
      <div className='flex flex-col gap-1'>
        <label htmlFor="confirmNewPassword" className='label-form'>{t('confirm_new_password')}</label>
        <PasswordInput
          id="confirmNewPassword"
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
        />
      </div>
      <Button className='self-center w-fit' onClick={onSubmit}>{t('update')}</Button>
    </div>
  )
}
