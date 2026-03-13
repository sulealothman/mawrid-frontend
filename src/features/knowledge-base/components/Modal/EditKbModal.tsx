import { useI18n } from '@/features/localization/hooks/useI18n';
import { Modal } from '@/features/shared/components/Modal/Modal';
import EditKnowledgeBaseContaianer from '../Form/EditKnowledgeBaseContainer';

interface EditKbModalProps {
    showEditKbModal: boolean;
    closeEditKbModal: () => void;
    selectedKb: KnowledgeBase;
    editKbHandler: (newName: string, description: string) => void;
    isSubmitting: boolean;
}

export default function EditKbModal({
    showEditKbModal,
    closeEditKbModal,
    selectedKb,
    editKbHandler,
    isSubmitting,
}: EditKbModalProps) {
    const { t } = useI18n();
    return (
        <Modal
            isOpen={showEditKbModal}
            onClose={closeEditKbModal}
            title={t('edit_kb')}
            size='lg'
        >
            <EditKnowledgeBaseContaianer
                key={selectedKb.id}
                knowledgeBase={selectedKb}
                editKbHandler={editKbHandler}
                onCancel={closeEditKbModal}
                isSubmitting={isSubmitting}
            />
        </Modal>
    )
}
