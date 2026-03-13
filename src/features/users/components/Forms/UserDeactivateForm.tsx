import { useI18n } from '@/features/localization/hooks/useI18n';
import Button from '@/features/shared/components/Button/Button';

interface UserDeactivateFormProps {
  openDeactivateAccountModal: () => void;
}

export default function UserDeactivateForm({ openDeactivateAccountModal }: UserDeactivateFormProps) {
  const { t } = useI18n();
  return (
    <div className='flex max-md:flex-col gap-2 rounded-xl px-4 py-4 justify-between items-center w-full bg-primary shadow-md border border-neutral-300/50 dark:border-neutral-700/50'>
      <div className="flex flex-col gap-1">
        <h2 className='font-semibold text-lg p-0 m-0 font-mixed text-primary'>{t('deactivate_account')}</h2>
        <p className='text-sm text-secondary m-0 p-0 font-mixed'>{t('deactivate_account_confirmation')}</p>
      </div>
      <Button variant="danger" className='self-center w-fit' onClick={openDeactivateAccountModal}>{t('deactivate')}</Button>
    </div>
  )
}
