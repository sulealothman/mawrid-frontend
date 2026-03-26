import { ChatIcon } from '@/features/knowledge-base/icons/KnowledgeBaseIcon';
import { useI18n } from '@/features/localization/hooks/useI18n';
import { DeleteIcon, EditIcon } from '@/features/shared/icons/CommonIcons';
import React from 'react'

interface ChatItemProps {
    chat: Chat;
    redirectToChat: (chatId: string, isNew?: boolean) => void;
    setSelectedChat: React.Dispatch<React.SetStateAction<Chat | null>>;
    setShowEditChatModal: React.Dispatch<React.SetStateAction<boolean>>;
    setShowDeleteChatModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ChatItem({
    chat,
    redirectToChat,
    setSelectedChat,
    setShowEditChatModal,
    setShowDeleteChatModal
}: ChatItemProps) {
    const { t } = useI18n();
    return (
        <div
            key={chat.id}
            className="bg-accent shadow-md border border-secondary rounded-lg p-4 transition-colors cursor-pointer group"
            onClick={() => redirectToChat(chat.id!, false)}
        >
            <div className="flex items-center justify-start gap-2">
                <div className='flex items-center justify-center p-3 rounded-xl duration-200 bg-tertiary dark:bg-secondary group-hover:bg-quaternary group-hover:dark:bg-tertiary'>
                    <ChatIcon className="size-4 md:size-6 shrink-0 stroke-secondary" viewBox='0 0 24 24' />
                </div>
                <div className="flex items-center space-x-3 flex-1 min-w-0">

                    <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-primary truncate font-noto-sans-arabic">
                            {chat.title}
                        </h4>
                        <div className="flex items-center gap-3 text-xs text-tertiary mt-1">
                            <span>
                                {t('created')} {new Date(chat.created_at!).toLocaleDateString()}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setSelectedChat(chat);
                            setShowEditChatModal(true);
                        }}
                        className="p-2"
                        title={t('edit')}
                    >
                        <EditIcon className="w-4 h-4 stroke-primary hover:dark:stroke-secondary cursor-pointer duration-200" viewBox='0 0 24 24' />
                    </button>

                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setSelectedChat(chat);
                            setShowDeleteChatModal(true);
                        }}
                        className="p-2"
                        title={t('delete')}
                    >
                        <DeleteIcon className="w-4 h-4 stroke-primary hover:stroke-danger cursor-pointer duration-200" viewBox='0 0 24 24' />
                    </button>
                </div>
            </div>
        </div>
    )
}
