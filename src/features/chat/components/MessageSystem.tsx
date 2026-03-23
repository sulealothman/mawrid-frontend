import { MessageAvatar } from './MessageAvatar'
import { MessageTimestamp } from './MessageTimestamp'

interface MessageSystemProps {
  message: ChatMessage;
}

export default function MessageSystem({ message }: MessageSystemProps) {
  return (
    <div
      className="group w-full"
    >
      <div className="flex p-2 md:p-6 max-w-4xl mx-auto">
        <div className={`flex w-full justify-end ltr:flex-row-reverse`}>
          <div className="flex-1">
            <div
              className={`rounded-xl p-3 bg-red-300 text-red-700 text-sm font-normal font-mixed w-fit`}
            >
              <div>{message.content}</div>
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