import { useI18n } from '@/features/localization/hooks/useI18n';
import { Modal } from '@/features/shared/components/Modal/Modal';
import CreateFileContainer from '../Form/CreateFileContainer';

interface CreateFileModalProps {
    showCreateFileModal: boolean;
    closeCreateFileModal: () => void;
    createFileHandler: (file: CreateFileRequest) => void;
    isSubmitting: boolean;
    kbId: string;
}

export default function CreateFileModal({
    showCreateFileModal,
    closeCreateFileModal,
    createFileHandler,
    isSubmitting,
    kbId
}: CreateFileModalProps) {
    const { t } = useI18n();
    return (
        <Modal
            isOpen={showCreateFileModal}
            onClose={closeCreateFileModal}
            title={t('create_file')}
            size='xxl'
            className='h-2/3 lg:h-3/4'
        >
            <CreateFileContainer
                createFileHandler={createFileHandler}
                onCancel={closeCreateFileModal}
                isSubmitting={isSubmitting}
                kbId={kbId}
            />
        </Modal>
    )
}
