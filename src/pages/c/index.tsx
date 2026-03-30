import { ReactNode } from 'react';
import Layout from '@/features/shared/layout/DefaultLayout';
import { KBStore } from '@/features/knowledge-base/store/KBStore';
import Heads from '@/features/shared/template/Heads';
import { useI18n } from '@/features/localization/hooks/useI18n';
import NewChatView from '@/features/chat/views/NewChatView';
import useAuthMount from '@/features/authenticate/hooks/useAuthMount';
import BlankLoading from '@/features/shared/components/Loaders/BlankLoading';
import { useChatActions } from '@/features/chat/hooks/useChatActions';

export default function Index() {
  const { isMounted } = useAuthMount();

  const { t } = useI18n();
  const { kb_id } = KBStore();
  const {
    createChat,
  } = useChatActions(kb_id);

  if (!isMounted) return (<BlankLoading />);
  
  return (
    <>
      <Heads title={t('chat')} />
      <NewChatView onSendMessage={createChat} />
    </>
  );
}


Index.getLayout = (page: ReactNode) => <Layout>{page}</Layout>;