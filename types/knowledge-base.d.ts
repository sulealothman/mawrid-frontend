type KnowledgeBase = {
    id: string;
    title: string;
    description?: string;
    created_at: string;
    updated_at: string;
    deleted_at?: string;
    files_count?: number;
    files?: KnowledgeBaseFile[];
    chats_count?: number;
    chats?: Chat[];
}

type KnowledgeBaseList = {
    data: KnowledgeBase[];
}

type KnowledgeBaseFile = {
    id: number;
    name: string;
    original_name: string;
    url: string;
    status: 'queued' | 'processing' | 'processed' | 'canceled' | 'failed';
    created_at: string;
}

// Knowledge Base API Types
type GetKnowledgeBasesResponse = {
    data: KnowledgeBase[];
    
}
type GetKnowledgeBaseResponse = KnowledgeBase
type CreateKnowledgeBaseRequest = {
    title: string;
    description?: string;
}
type CreateKnowledgeBaseResponse = KnowledgeBase
type UpdateKnowledgeBaseRequest = {
    title?: string;
    description?: string;
}
type UpdateKnowledgeBaseResponse = KnowledgeBase

// Files API Types
type GetFilesResponse = KnowledgeBaseFile[]
type GetFileResponse = KnowledgeBaseFile
type CreateFileRequest = {
    content: string;
    filename: string;
    knowledge_base_id: string;
}
type CreateFileResponse = KnowledgeBaseFile
type UploadFileRequest = {
    file: File;
    file_name?: string;
    knowledge_base_id: string;
}
type UploadFileResponse = KnowledgeBaseFile
type UpdateFileRequest = {
    original_name?: string;
}
type UpdateFileResponse = KnowledgeBaseFile

// Form Types
type KnowledgeBaseFormData = {
    title: string;
    description: string;
}

// Store Types
type KnowledgeBaseStoreState = {
    knowledgeBases: KnowledgeBase[];
    currentKnowledgeBase: KnowledgeBase | null;
    files: KnowledgeBaseFile[];
    currentFile: KnowledgeBaseFile | null;
    isLoading: boolean;
    error: string | null;
}

type KnowledgeBaseStoreActions = {
    setKnowledgeBases: (kbs: KnowledgeBase[]) => void;
    addKnowledgeBase: (kb: KnowledgeBase) => void;
    updateKnowledgeBase: (kb: KnowledgeBase) => void;
    removeKnowledgeBase: (id: string) => void;
    setCurrentKnowledgeBase: (kb: KnowledgeBase | null) => void;
    setFiles: (files: KnowledgeBaseFile[]) => void;
    addFile: (file: KnowledgeBaseFile) => void;
    updateFile: (file: KnowledgeBaseFile) => void;
    removeFile: (id: number) => void;
    setCurrentFile: (file: KnowledgeBaseFile | null) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
}