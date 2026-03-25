import { useI18n } from '@/features/localization/hooks/useI18n';
import Button from '@/features/shared/components/Button/Button';
import { Modal } from '@/features/shared/components/Modal/Modal';

interface DeleteKbModalProps {
    showDeleteKbModal: boolean;
    closeDeleteKbModal: () => void;
    selectedKb: KnowledgeBase;
    deleteKbHandler: (kb: KnowledgeBase) => void;
    isSubmitting: boolean;
}

export default function DeleteKbModal({
    showDeleteKbModal,
    closeDeleteKbModal,
    selectedKb,
    deleteKbHandler,
    isSubmitting,
}: DeleteKbModalProps) {
        const { t } = useI18n();
    return (
        <Modal
            isOpen={showDeleteKbModal}
            onClose={closeDeleteKbModal}
            title={t('delete_kb')}
            size='lg'
        >
            <div className="space-y-6">
                <p className='text-secondary'>
                    {t('delete_kb_confirmation')}
                </p>

                <div className="flex gap-3">
                    <Button
                        onClick={() => {
                            deleteKbHandler(selectedKb);
                        }}
                        variant='danger'
                        disabled={isSubmitting}
                    >
                        {t('delete')}
                    </Button>

                    <Button
                        onClick={closeDeleteKbModal}
                        variant='tertiary'
                        className='shadow-none'
                    >
                        {t('cancel')}
                    </Button>
                </div>
            </div>
        </Modal>
    )
}
