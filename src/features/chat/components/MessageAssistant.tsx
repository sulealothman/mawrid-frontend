import { MessageAvatar } from './MessageAvatar'
import { MessageTimestamp } from './MessageTimestamp'
import { MarkdownRenderer } from './MarkdownRenderer';
interface MessageAssistantProps {
  message: ChatMessage;
}
export default function MessageAssistant( { message }: MessageAssistantProps) {
  return (
    <div
          className="group w-full"
        >
          <div className="flex p-2 md:p-6 max-w-4xl mx-auto">
            <div className={`flex w-full justify-end ltr:flex-row-reverse`}>
                  
              <div className="flex-1">
                
                <div
                  className={`rounded-2xl px-2`}
                >
                  <MarkdownRenderer
                    content={message.content}
                    isUser={false}
                  />
                </div>
    
                <MessageTimestamp
                  createdAt={message.created_at}
                  alignRight={false}
                />
              </div>
              <MessageAvatar isUser={false} />
            </div>
          </div>
        </div>
  )
}
