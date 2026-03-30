import { ReactNode, useEffect, useRef } from 'react';
import useChatFetch from '@/features/chat/hooks/useChatFetch';
import { useRouter } from 'next/router';
import { KBStore } from '@/features/knowledge-base/store/KBStore';
import Layout from '@/features/shared/layout/DefaultLayout';
import Heads from '@/features/shared/template/Heads';
import ChatView from '@/features/chat/views/ChatView';
import ErrorView from '@/features/shared/views/ErrorView';
import ChatLoadingView from '@/features/chat/views/ChatLoadingView';
import useAuthMount from '@/features/authenticate/hooks/useAuthMount';
import { useChat } from '@/features/chat/hooks/useChat';
import { DraftPendingMessageStore } from '@/features/chat/store/DraftPendingMessageStore';

export default function ChatPage() {
  const { isMounted } = useAuthMount();

  const { kb_id } = KBStore();
  const router = useRouter();
  const { isReady, query } = router;
  const { id } = query;
  const chatId = id as string;

  const initializedRef = useRef(false);
  const pendingSentRef = useRef(false);

  const {
    chat,
    isLoading,
    isFetched,
    isError,
    fetchChat,
  } = useChatFetch(kb_id, chatId, isReady);

  const {
    pendingMessage,
    session,
    resetDraftPendingMessageStore,
  } = DraftPendingMessageStore();

  const {
    chatMessages,
    setChatMessages,
    sendMessage,
    cancelMessage,
    isConnected,
    isSubmitting,
  } = useChat(kb_id, chat?.session ?? null);

  useEffect(() => {
    if (!isFetched || chat === null) return;
    if (initializedRef.current) return;

    setChatMessages(chat?.messages || []);
    initializedRef.current = true;
  }, [isFetched, chat, setChatMessages]);

  useEffect(() => {
    initializedRef.current = false;
    pendingSentRef.current = false;
  }, [chatId]);

  useEffect(() => {
    if (!isFetched || !chat) return;
    if (!isConnected) return;
    if (pendingSentRef.current) return;
    if (!pendingMessage.trim()) return;
    if (session?.chat_id !== chatId) return;

    pendingSentRef.current = true;

    sendMessage(pendingMessage).finally(() => {
      resetDraftPendingMessageStore();
    });
  }, [
    isFetched,
    chat,
    isConnected,
    pendingMessage,
    session,
    chatId,
    sendMessage,
    resetDraftPendingMessageStore,
  ]);

  if (isLoading || !isMounted) {
    return <ChatLoadingView />;
  }

  if (isError) {
    return <ErrorView callbackFunc={() => fetchChat()} />;
  }

  return (
    <>
      <Heads title={chat?.title} />
      <ChatView
        chat={chat}
        messages={chatMessages}
        isSubmitting={isSubmitting}
        onSendMessage={sendMessage}
        onCancelMessage={cancelMessage}
      />
    </>
  );
}

ChatPage.getLayout = (page: ReactNode) => <Layout>{page}</Layout>;