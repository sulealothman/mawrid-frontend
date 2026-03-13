import React from 'react';
import { MessageBubble } from './MessageBubble';
import { useAutoScroll } from '@/features/shared/hooks/useAutoScroll';
import { useI18n } from '@/features/localization/hooks/useI18n';

interface MessageListProps {
  messages?: ChatMessage[];
}

export const MessageList: React.FC<MessageListProps> = ({ messages = [] }) => {
  const { t } = useI18n();
  const scrollContainerRef = useAutoScroll(messages);


  if (messages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center text-neutral-500 dark:text-neutral-400">
        <div className="text-center max-w-md mx-auto px-2 md:px-6">
          <div className="text-6xl mb-6 text-neutral-300 dark:text-neutral-600">
            <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-3 text-neutral-900 dark:text-neutral-100">{t('hello_chat')}</h3>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">{t('start_new_chat')}</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={scrollContainerRef}
      className="h-full overflow-y-auto custom-scrollbar"
      style={{
        scrollbarWidth: 'thin',
        scrollbarColor: 'rgb(163 163 163) transparent'
      }}
    >
      <div className="min-h-full">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        <div className="h-8" />
      </div>
    </div>
  );
};