import { useI18n } from '@/features/localization/hooks/useI18n';
import { Modal } from '@/features/shared/components/Modal/Modal';
import EditFileContaianer from '../Form/EditFileContainer';

interface RenameFileModalProps {
    showEditFileModal: boolean;
    closeEditFileModal: () => void;
    selectedFile: KnowledgeBaseFile;
    editFileHandler: (newName: string) => void;
    isSubmitting: boolean;
}

export default function RenameFileModal({
    showEditFileModal,
    closeEditFileModal,
    selectedFile,
    editFileHandler,
    isSubmitting,
}: RenameFileModalProps) {
    const { t } = useI18n();
    return (
        <Modal
            isOpen={showEditFileModal}
            onClose={closeEditFileModal}
            title={t('rename_file')}
            size='lg'
        >
            <EditFileContaianer
                file={selectedFile}
                editFileHandler={editFileHandler}
                onCancel={closeEditFileModal}
                isSubmitting={isSubmitting}
            />
        </Modal>
    )
}
