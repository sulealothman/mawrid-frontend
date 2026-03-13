import MessageAssistant from "./MessageAssistant";
import MessageSystem from "./MessageSystem";
import MessageUser from "./MessageUser";

interface MessageBubbleProps {
  message: ChatMessage;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.role === "user";

  switch (message.role) {
    case "system":
      return <MessageSystem message={message} />
    case "assistant":
      return <MessageAssistant message={message} />
  }

  if(isUser) return <MessageUser message={message} />
};