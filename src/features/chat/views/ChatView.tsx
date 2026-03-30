import { useI18n } from '@/features/localization/hooks/useI18n';
import { motion } from 'framer-motion'
import { ChatHeader } from '../components/ChatHeader';
import { MessageList } from '../components/MessageList';
import { MessageInput } from '../components/MessageInput';
import useRedirect from '@/features/shared/hooks/useRedirect';

interface ChatViewProps {
  chat?: Chat;
  isSubmitting: boolean;
  messages: ChatMessage[];
  onSendMessage: (message: string) => void;
  onCancelMessage: () => void;
}

export default function ChatView({ chat, messages, isSubmitting, onSendMessage, onCancelMessage }: ChatViewProps) {
  const { t } = useI18n();
  const { redirectToKnowledgeBase } = useRedirect();
  return (
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
          <ChatHeader title={chat?.title || t('select_conversation')} kbId={chat?.knowledge_base_id} backHandler={redirectToKnowledgeBase} />
        </div>

        {chat ? (
          <>
            <div className="flex-1 overflow-hidden">
              <MessageList messages={messages} />
            </div>
            <div className="shrink-0">
              <MessageInput isSubmitting={isSubmitting} onSendMessage={onSendMessage} onCancelMessage={onCancelMessage} />
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="w-full max-w-2xl px-2 md:px-4">
              <MessageInput isSubmitting={isSubmitting} onSendMessage={onSendMessage} onCancelMessage={onCancelMessage} />
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
}
