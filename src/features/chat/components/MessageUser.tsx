import React from 'react'
import { MessageAvatar } from './MessageAvatar'
import { MessageTimestamp } from './MessageTimestamp'
import { MarkdownRenderer } from './MarkdownRenderer';
import CopyMessage from './CopyMessage';

interface MessageUserProps {
  message: ChatMessage;
}

export default function MessageUser({ message }: MessageUserProps) {
  const refContent = React.useRef<HTMLDivElement>(null);
  return (
    <div
      className="group w-full"
    >
      <div className="flex p-2 md:p-6 max-w-4xl mx-auto">
        <div className={`flex w-full justify-start gap-2 ltr:flex-row-reverse`}>
          <MessageAvatar isUser={true} />
          <div className="max-w-2xl">

            <div
              className={`rounded-2xl px-4 py-2 bg-tertiary`}
              ref={refContent}
            >
              <MarkdownRenderer
                content={message.content}
              />
            </div>

            <div className='flex rtl:flex-row-reverse gap-2 items-center py-1 justify-end'>
              <MessageTimestamp
                createdAt={message.created_at}
                alignRight={true}
              />
              <CopyMessage contentRef={refContent} />

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
