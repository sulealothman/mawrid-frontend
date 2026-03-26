import React, { useState } from 'react';
import { useChatActions } from '../hooks/useChatActions';
import useRedirect from '@/features/shared/hooks/useRedirect';
import DeleteChatModal from './Modal/DeleteChatModal';
import RenameChatModal from './Modal/RenameChatModal';
import ChatItem from './ChatItem';

interface ChatsListProps {
    chats: Chat[];
    kbId: string;
}

const ChatsList: React.FC<ChatsListProps> = ({
    chats,
    kbId
}) => {
    const { redirectToChat } = useRedirect();

    const [showEditChatModal, setShowEditChatModal] = useState(false);
    const [showDeleteChatModal, setShowDeleteChatModal] = useState(false);
    const [selectedChat, setSelectedChat] = useState<Chat | null>(null);

    const {
        isSubmitting,
        updateChat,
        deleteChat,
    } = useChatActions(kbId);


    const closeEditChatModal = () => {
        setShowEditChatModal(false);
        setSelectedChat(null);
    }

    const editChatHandler = async (newName: string) => {
        if (isSubmitting) return;
        if (selectedChat) {
            const response = await updateChat(selectedChat.id!, { title: newName });
            if (response) {
                closeEditChatModal();
            }
        }
    };

    const deleteChatHandler = async (chat: Chat) => {
        if (isSubmitting) return;
        try {
            await deleteChat(chat.id!);
            setShowDeleteChatModal(false);
            setSelectedChat(null);
        } catch {
        }
    }

    return (
        <>
            {showEditChatModal && selectedChat && (
                <RenameChatModal
                    showEditChatModal={showEditChatModal}
                    closeEditChatModal={closeEditChatModal}
                    selectedChat={selectedChat}
                    editChatHandler={editChatHandler}
                    isSubmitting={isSubmitting}
                />
            )}

            {showDeleteChatModal && selectedChat && (
                <DeleteChatModal
                    showDeleteChatModal={showDeleteChatModal}
                    closeDeleteChatModal={() => setShowDeleteChatModal(false)}
                    selectedChat={selectedChat}
                    deleteChatHandler={deleteChatHandler}
                    isSubmitting={isSubmitting}

                />
            )}
            <div className="overflow-y-auto custom-scrollbar">
                <div className='space-y-2 px-2'>
                    {chats.map((chat) => (
                        <ChatItem
                            key={chat.id}
                            chat={chat}
                            redirectToChat={redirectToChat}
                            setSelectedChat={setSelectedChat}
                            setShowEditChatModal={setShowEditChatModal}
                            setShowDeleteChatModal={setShowDeleteChatModal}
                        />
                    ))}
                </div>
            </div>
        </>
    );
};

export default ChatsList;