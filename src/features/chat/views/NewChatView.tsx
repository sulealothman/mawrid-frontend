import { motion } from 'framer-motion'
import { MessageInput } from '../components/MessageInput'
import { KBStore } from '@/features/knowledge-base/store/KBStore';
import useRedirect from '@/features/shared/hooks/useRedirect';
import { useI18n } from '@/features/localization/hooks/useI18n';
import { ChatHeader } from '../components/ChatHeader';

interface NewChatViewProps {
  onSendMessage: (message: string) => void;
}

export default function NewChatView({ onSendMessage }: NewChatViewProps) {
    const { kb_id } = KBStore((state) => state);
    const { redirectToKnowledgeBase } = useRedirect();
    const { t } = useI18n();
  return (
    <div className="flex h-full w-full">
      <motion.div
        className="flex-1 flex flex-col"
        animate={{
          marginLeft: 0,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
        }}
      >
        <div className="flex-1 flex flex-col h-full overflow-hidden">
              <div className="shrink-0">
                <ChatHeader title={t('new_chat')} kbId={kb_id} backHandler={redirectToKnowledgeBase} />
              </div>
                <div className="flex-1 flex items-center justify-center">
                  <div className="w-full max-w-2xl px-4">
                    <MessageInput onSendMessage={onSendMessage} />
                  </div>
                </div>
            </div>
      </motion.div>
    </div>
  )
}
