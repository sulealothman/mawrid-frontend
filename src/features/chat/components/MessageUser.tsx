import React from 'react'
import { MessageAvatar } from './MessageAvatar'
import { MessageTimestamp } from './MessageTimestamp'
import { MarkdownRenderer } from './MarkdownRenderer';
interface MessageUserProps {
  message: ChatMessage;
}
export default function MessageUser({ message }: MessageUserProps) {
  return (
    <div
      className="group w-full"
    >
      <div className="flex p-2 md:p-6 max-w-4xl mx-auto">
        <div className={`flex w-full justify-start gap-2 ltr:flex-row-reverse`}>
          <MessageAvatar isUser={true} />
          <div className="max-w-2xl">

            <div
              className={`rounded-2xl px-4 py-2 bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white`}
            >
              <MarkdownRenderer
                content={message.content}
                isUser={true}
              />
            </div>

            <MessageTimestamp
              createdAt={message.created_at}
              alignRight={true}
            />
          </div>


        </div>
      </div>
    </div>
  )
}
