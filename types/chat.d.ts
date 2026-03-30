

type MessageRole = 'user' | 'assistant' | 'system';

type Chat = {
    id?: string; // UUID
    knowledge_base_id: string; // UUID
    title: string;
    messages?: ChatMessage[];
    session?: ChatSession | null;
    created_at?: string;
    updated_at?: string;
}

type ChatMessage = {
    id?: number;
    chat_id: string; // UUID
    role: MessageRole;
    content: string;
    sources?: ChatMessageSource[] | null;
    usage?: ChatMessageUsage | null;
    created_at?: string;
    updated_at?: string;
}

type ChatMessageSource = {
    file: string;
    page: number;
    score_rerank?: number;
    score_vector?: number;
}

type ChatMessageUsage = {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
}


type SendMessageRequest = {
    chat_id?: string; // UUID
}

type MessageResponse = {
    chat_id: string; // UUID
    message: ChatMessage;
}

type SendMessageResponse = Chat | MessageResponse

type GetChatsResponse = {
    data: Chat[];
}

type GetChatResponse = Chat

type GetChatMessagesResponse = {
    data: ChatMessage[];
}


type UpdateChatRequest = {
    title: string;
}

type UpdateChatResponse = Chat

type ChatSession = {
    chat_id: string;
    ws_url: string;
    token: string;
    expires_in: number;
}

type ChatSessionResponse = ChatSession

type SendWsMessageParams = {
    requestId: string;
    chatId: string;
    kbId: string;
    message: string;
    messages: Array<{ role: string; content: string }>;
};

type UseChatSocketParams = {
    session?: ChatSessionResponse | null;
    onDelta?: (requestId: string, chunk: string) => void;
    onDone?: (requestId: string, data: PersistedChatPayload | null) => void;
    onCancelled?: (requestId: string, data: PersistedChatPayload | null) => void;
    onError?: (requestId: string | null, data: PersistedChatPayload | null, message?: string) => void;
};

type PersistedChatPayload = {
  chat_id: string;
  user_message: ChatMessage;
  reply_message: ChatMessage;
};