import ApiClient from '@/features/shared/controllers/ApiClient';
import { AxiosProgressEvent } from 'axios';

const FileController = {
    index: async (kbId: string, lang = 'en') => {
        return await ApiClient.get<null, GetFilesResponse>(`/api/kb/${kbId}/files`, null, lang);
    },

    show: async (kbId: string, fileId: number, lang = 'en') => {
        return await ApiClient.get<null, GetFileResponse>(`/api/kb/${kbId}/files/${fileId}`, null, lang);
    },

    store: async (kbId: string, body: CreateFileRequest, lang = 'en') => {
        return await ApiClient.post<CreateFileRequest, CreateFileResponse>(`/api/kb/${kbId}/files`, body, lang);
    },

    upload: async (kbId: string, body: Partial<UploadFileRequest>, signal: AbortSignal, onUploadProgress: (event: AxiosProgressEvent) => void, lang = 'en') => {
        return await ApiClient.post<Partial<UploadFileRequest>, UploadFileResponse>(`/api/kb/${kbId}/files/upload`, body, lang, 'multipart/form-data', signal, onUploadProgress);
    },

    update: async (fileId: number, body: UpdateFileRequest, lang = 'en') => {
        return await ApiClient.put<UpdateFileRequest, UpdateFileResponse>(`/api/files/${fileId}`, body, lang);
    },

    remove: async (fileId: number, lang = 'en') => {
        return await ApiClient.delete<null>(`/api/files/${fileId}`, lang);
    },

    delete: async (fileId: number, lang = 'en') => {
        return await ApiClient.delete<null>(`/api/files/${fileId}/force`, lang);
    }
}

export default FileController;