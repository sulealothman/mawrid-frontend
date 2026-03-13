import { useI18n } from '@/features/localization/hooks/useI18n';
import Button from '@/features/shared/components/Button/Button';
import { Modal } from '@/features/shared/components/Modal/Modal';

interface DeleteChatModalProps {
    showDeleteChatModal: boolean;
    closeDeleteChatModal: () => void;
    selectedChat: Chat;
    deleteChatHandler: (chat: Chat) => void;
    isSubmitting: boolean;
}

export default function DeleteChatModal({
    showDeleteChatModal,
    closeDeleteChatModal,
    selectedChat,
    deleteChatHandler,
    isSubmitting,
}: DeleteChatModalProps) {
        const { t } = useI18n();
    return (
        <Modal
            isOpen={showDeleteChatModal}
            onClose={closeDeleteChatModal}
            title={t('delete_chat')}
            size='lg'
        >
            <div className="space-y-6">
                <p>
                    {t('delete_chat_confirmation')}
                </p>

                <div className="flex gap-3">
                    <Button
                        onClick={() => {
                            deleteChatHandler(selectedChat);
                        }}
                        variant='danger'
                        disabled={isSubmitting}
                    >
                        {t('delete')}
                    </Button>

                    <Button
                        onClick={closeDeleteChatModal}
                    >
                        {t('cancel')}
                    </Button>
                </div>
            </div>
        </Modal>
    )
}
