import React from 'react';
import { MessageBubble } from './MessageBubble';
import { useAutoScroll } from '@/features/shared/hooks/useAutoScroll';

interface MessageListProps {
  messages?: ChatMessage[];
}

export const MessageList: React.FC<MessageListProps> = ({ messages = [] }) => {
  const scrollContainerRef = useAutoScroll(messages);

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