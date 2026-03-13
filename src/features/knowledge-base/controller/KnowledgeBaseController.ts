import ApiClient from '@/features/shared/controllers/ApiClient';

const KnowledgeBaseController = {
    index: async (lang = 'en') => {
        return await ApiClient.get<null, GetKnowledgeBasesResponse>('/api/kb', null, lang);
    },

    show: async (kbId: string, lang = 'en') => {
        return await ApiClient.get<null, GetKnowledgeBaseResponse>(`/api/kb/${kbId}`, null, lang);
    },

    store: async (body: CreateKnowledgeBaseRequest, lang = 'en') => {
        return await ApiClient.post<CreateKnowledgeBaseRequest, CreateKnowledgeBaseResponse>('/api/kb', body, lang);
    },

    update: async (kbId: string, body: UpdateKnowledgeBaseRequest, lang = 'en') => {
        return await ApiClient.put<UpdateKnowledgeBaseRequest, UpdateKnowledgeBaseResponse>(`/api/kb/${kbId}`, body, lang);
    },

    remove: async (kbId: string, lang = 'en') => {
        return await ApiClient.delete<null>(`/api/kb/${kbId}`, lang);
    },

    destroy: async (kbId: string, lang = 'en') => {
        return await ApiClient.delete<null>(`/api/kb/${kbId}/force`, lang);
    }
}

export default KnowledgeBaseController;