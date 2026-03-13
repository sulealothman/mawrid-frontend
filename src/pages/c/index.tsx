import { ReactNode } from 'react';
import Layout from '@/features/shared/layout/DefaultLayout';
import { KBStore } from '@/features/knowledge-base/store/KBStore';
import { useChatActions } from '@/features/chat/hooks/useChatActions';
import Heads from '@/features/shared/template/Heads';
import { useI18n } from '@/features/localization/hooks/useI18n';
import NewChatView from '@/features/chat/views/NewChatView';

export default function Index() {

  const { t } = useI18n();
  const { kb_id } = KBStore();
  const {
    sendMessage,
  } = useChatActions(kb_id);
  return (
    <>
      <Heads title={t('chat')} />
      <NewChatView onSendMessage={sendMessage} />
    </>
  );
}


Index.getLayout = (page: ReactNode) => <Layout>{page}</Layout>;