import { useState } from 'react';
import { useI18n } from '@/features/localization/hooks/useI18n';
import FileController from '../controller/FileController';
import { isAxiosError } from 'axios';

const useFileFetch = () => {
    const { language } = useI18n();
    const [files, setFiles] = useState<KnowledgeBaseFile[]>([]);
    const [currentFile, setCurrentFile] = useState<KnowledgeBaseFile | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchFiles = async (kbId: string) => {
        try {
            setIsLoading(true);
            setError(null);
            const response = await FileController.index(kbId, language);
            setFiles(response);
            return response;
        } catch (err: unknown) {
            if(isAxiosError(err)) {
              setError(err?.message);
            }
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const fetchFile = async (kbId: string, fileId: number) => {
        try {
            setIsLoading(true);
            setError(null);
            const response = await FileController.show(kbId, fileId, language);
            setCurrentFile(response);
            return response;
        } catch (err: unknown) {
            if(isAxiosError(err)) {
              setError(err?.message);
            }
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    return {
        files,
        currentFile,
        isLoading,
        error,
        setFiles,
        setCurrentFile,
        setError,
        fetchFiles,
        fetchFile
    };
};

export default useFileFetch;