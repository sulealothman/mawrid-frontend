

type MessageRole = 'user' | 'assistant' | 'system';

type Chat = {
    id?: string; // UUID
    knowledge_base_id: string; // UUID
    title: string;
    messages?: ChatMessage[];
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
    message: string;
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