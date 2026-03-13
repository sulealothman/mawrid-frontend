import ApiClient from '@/features/shared/controllers/ApiClient';

const ChatController = {
    index: async (kbId: string, lang = 'en') => {
        return await ApiClient.get<null, GetChatsResponse>(`/api/kb/${kbId}/chats`, null, lang);
    },

    show: async (chatId: string, lang = 'en') => {
        return await ApiClient.get<null, GetChatResponse>(`/api/chats/${chatId}`, null, lang);
    },

    // store: async (body: CreateKnowledgeBaseRequest, lang = 'en') => {
    //     return await ApiClient.post<CreateKnowledgeBaseRequest, CreateKnowledgeBaseResponse>('/api/kb', body, lang);
    // },

    send: async (kbId: string, body: SendMessageRequest, lang = 'en') => {
        return await ApiClient.post<SendMessageRequest, GetChatResponse>(`/api/kb/${kbId}/chats/send`, body, lang);
    },

    update: async (chatId: string, body: UpdateChatRequest, lang = 'en') => {
        return await ApiClient.put<UpdateChatRequest, UpdateChatResponse>(`/api/chats/${chatId}`, body, lang);
    },

    remove: async (chatId: string, lang = 'en') => {
        return await ApiClient.delete<null>(`/api/chats/${chatId}`, lang);
    },
}

export default ChatController;