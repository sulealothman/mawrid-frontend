import { useI18n } from '@/features/localization/hooks/useI18n';
import { Modal } from '@/features/shared/components/Modal/Modal';
import CreateKnowledgeBaseContainer from '../Form/CreateKnowledgeBaseContainer';

interface CreateKbModalProps {
    showCreateKbModal: boolean;
    closeCreateKbModal: () => void;
    createKbHandler: (kb: CreateKnowledgeBaseRequest) => void;
    isSubmitting: boolean;
}

export default function CreateKbModal({
    showCreateKbModal,
    closeCreateKbModal,
    createKbHandler,
    isSubmitting,
}: CreateKbModalProps) {
    const { t } = useI18n();
    return (
        <Modal
            isOpen={showCreateKbModal}
            onClose={closeCreateKbModal}
            title={t('create_knowledge_base')}
            size='lg'
        >
            <CreateKnowledgeBaseContainer
                createKbHandler={createKbHandler}
                onCancel={closeCreateKbModal}
                isSubmitting={isSubmitting}
            />
        </Modal>
    )
}
