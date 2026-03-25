import { useI18n } from '@/features/localization/hooks/useI18n';
import Button from '@/features/shared/components/Button/Button';
import { Modal } from '@/features/shared/components/Modal/Modal';

interface DeleteFileModalProps {
    showDeleteFileModal: boolean;
    closeDeleteFileModal: () => void;
    selectedFile: KnowledgeBaseFile;
    deleteFileHandler: (file: KnowledgeBaseFile) => void;
    isSubmitting: boolean;
}

export default function DeleteFileModal({
    showDeleteFileModal,
    closeDeleteFileModal,
    selectedFile,
    deleteFileHandler,
    isSubmitting,
}: DeleteFileModalProps) {
        const { t } = useI18n();
    return (
        <Modal
            isOpen={showDeleteFileModal}
            onClose={closeDeleteFileModal}
            title={t('delete_file')}
            size='lg'
        >
            <div className="space-y-6">
                <p className='text-secondary'>
                    {t('delete_file_confirmation')}
                </p>

                <div className="flex gap-3">
                    <Button
                        onClick={() => {
                            deleteFileHandler(selectedFile);
                        }}
                        variant='danger'
                        disabled={isSubmitting}
                    >
                        {t('delete')}
                    </Button>

                    <Button
                        onClick={closeDeleteFileModal}
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
