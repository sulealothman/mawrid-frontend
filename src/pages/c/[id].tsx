import { ReactNode, useEffect } from 'react';
import useChatFetch from '@/features/chat/hooks/useChatFetch';
import { useRouter } from 'next/router';
import { KBStore } from '@/features/knowledge-base/store/KBStore';
import { useChatActions } from '@/features/chat/hooks/useChatActions';
import Layout from '@/features/shared/layout/DefaultLayout';
import Heads from '@/features/shared/template/Heads';
import ChatView from '@/features/chat/views/ChatView';
import ErrorView from '@/features/shared/views/ErrorView';
import ChatLoadingView from '@/features/chat/views/ChatLoadingView';
import useAuthMount from '@/features/authenticate/hooks/useAuthMount';


export default function ChatPage() {
  const { isMounted } = useAuthMount();

  const { kb_id } = KBStore();
  const router = useRouter();
  const { isReady, query } = router;
  const { id } = query;
  const chatId = id as string;
  const {
    chat,
    isLoading,
    isFetched,
    isError,
    fetchChat
  } = useChatFetch(kb_id, chatId, isReady);

  const {
    setChatMessages,
    sendMessage,
  } = useChatActions(kb_id, chatId);


  useEffect(() => {

    if (isFetched && chat !== null) {
      setChatMessages(chat?.messages || []);
    }

  }, [isFetched, chat, setChatMessages]);

  if (isLoading || !isMounted) {
    return <ChatLoadingView />;
  }

  if (isError) {
    return <ErrorView callbackFunc={() => fetchChat()} />;
  }

  return (
    <>
      <Heads title={chat?.title} />
      <ChatView chat={chat} onSendMessage={sendMessage} />
    </>
  );
}


ChatPage.getLayout = (page: ReactNode) => <Layout>{page}</Layout>;