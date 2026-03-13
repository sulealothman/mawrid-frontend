import { useI18n } from '@/features/localization/hooks/useI18n';
import Button from '@/features/shared/components/Button/Button';
import { Modal } from '@/features/shared/components/Modal/Modal';

interface DeactivateAccountModalProps {
    showDeactivateAccountModal: boolean;
    closeDeactivateAccountModal: () => void;
    onDeactivate: () => void;
}

export default function DeactivateAccountModal({
    showDeactivateAccountModal,
    closeDeactivateAccountModal,
    onDeactivate,
}: DeactivateAccountModalProps) {
        const { t } = useI18n();
    return (
        <Modal
            isOpen={showDeactivateAccountModal}
            onClose={closeDeactivateAccountModal}
            title={t('deactivate_account')}
            size='lg'
        >
            <div className="space-y-6">
                <p className='text-primary'>
                    {t('deactivate_account_confirmation')}
                </p>

                <div className="flex gap-3">
                    <Button
                        onClick={onDeactivate}
                        variant='danger'
                    >
                        {t('deactivate')}
                    </Button>

                    <Button
                        onClick={closeDeactivateAccountModal}
                    >
                        {t('cancel')}
                    </Button>
                </div>
            </div>
        </Modal>
    )
}
