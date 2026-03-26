import { MessageAvatar } from './MessageAvatar'
import { MessageTimestamp } from './MessageTimestamp'
import { MarkdownRenderer } from './MarkdownRenderer';
import CopyMessage from './CopyMessage';
import { useRef } from 'react';

interface MessageAssistantProps {
  message: ChatMessage;
}

export default function MessageAssistant({ message }: MessageAssistantProps) {
  const refContent = useRef<HTMLDivElement>(null);
  return (
    <div
      className="group w-full"
    >
      <div className="flex p-2 md:p-6 max-w-4xl mx-auto">
        <div className={`flex w-full justify-end ltr:flex-row-reverse`}>

          <div className="flex-1">
            <div
              className={`rounded-2xl px-2`}
              ref={refContent}
            >
              <MarkdownRenderer
                content={message.content}
              />
            </div>

            <div className='flex gap-2 items-center py-1 justify-start'>
              <CopyMessage contentRef={refContent} />
              <MessageTimestamp
                createdAt={message.created_at}
                alignRight={false}
              />
            </div>
          </div>
          <MessageAvatar isUser={false} />
        </div>
      </div>
    </div>
  )
}
