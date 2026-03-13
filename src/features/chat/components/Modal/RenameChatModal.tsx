import { useI18n } from '@/features/localization/hooks/useI18n';
import { Modal } from '@/features/shared/components/Modal/Modal';
import EditChatContaianer from '../Form/EditChatContainer';

interface RenameChatModalProps {
    showEditChatModal: boolean;
    closeEditChatModal: () => void;
    selectedChat: Chat;
    editChatHandler: (newName: string) => void;
    isSubmitting: boolean;
}

export default function RenameChatModal({
    showEditChatModal,
    closeEditChatModal,
    selectedChat,
    editChatHandler,
    isSubmitting,
}: RenameChatModalProps) {
    const { t } = useI18n();
    return (
        <Modal
            isOpen={showEditChatModal}
            onClose={closeEditChatModal}
            title={t('rename_chat')}
            size='lg'
        >
            <EditChatContaianer
                chat={selectedChat}
                editChatHandler={editChatHandler}
                onCancel={closeEditChatModal}
                isSubmitting={isSubmitting}
            />
        </Modal>
    )
}
