import { useState } from 'react';
import { useI18n } from '@/features/localization/hooks/useI18n';
import FileController from '../controller/FileController';
import useFileAlertToast from './useFileAlertToast';
import { useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import useCommonErrorAlertToast from '@/features/shared/hooks/useCommonErrorAlertToast';

const useFileActions = () => {
    const queryClient = useQueryClient();
    const { language } = useI18n();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { somethingWentWrongAlert } = useCommonErrorAlertToast();
    const { showCreateFileSuccessToast, showRenameFileSuccessToast, showDeleteFileSuccessToast, showErrorToast } = useFileAlertToast();

    const createFile = async (body: CreateFileRequest) => {
        try {
            setIsSubmitting(true);
            const response = await FileController.store(body.knowledge_base_id, body, language);
            if(response) {
                queryClient.invalidateQueries({
                    queryKey: ['knowledgeBase', body.knowledge_base_id],
                });
                queryClient.invalidateQueries({
                    queryKey: ['knowledgeBases'],
                });
                showCreateFileSuccessToast();
            }
            return response;
        } catch (error: unknown) {
            if(isAxiosError(error) && error.response?.status === 422) {
              showErrorToast(error?.response?.data?.errors[0]);
              return;
            }
            somethingWentWrongAlert();
        } finally {
            setIsSubmitting(false);
        }
    };

    const updateFile = async (kbId: string, fileId: number, data: UpdateFileRequest) => {
        try {
            setIsSubmitting(true);
            const response = await FileController.update(fileId, data, language);
            if(response) {
                showRenameFileSuccessToast();
                queryClient.invalidateQueries({
                    queryKey: ['knowledgeBase', kbId],
                });
            }
            return response;
        } catch (error: unknown) {
            if(isAxiosError(error) && error.response?.status === 422) {
              showErrorToast(error?.response?.data?.errors[0]);
              return;
            }
            somethingWentWrongAlert();
        } finally {
            setIsSubmitting(false);
        }
    };

    const deleteFile = async (kbId: string, fileId: number) => {
        try {
            setIsSubmitting(true);
            const response =await FileController.remove(fileId, language);
            if(response) {
                queryClient.invalidateQueries({
                    queryKey: ['knowledgeBase', kbId],
                });
                queryClient.invalidateQueries({
                    queryKey: ['knowledgeBases'],
                });
                showDeleteFileSuccessToast();
            }
        } catch (error: unknown) {
            if(isAxiosError(error) && error.response?.status === 404) {
              showErrorToast("file_not_found");
              return;
            }
            somethingWentWrongAlert();
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        createFile,
        updateFile,
        deleteFile,
        isSubmitting
    };
};

export default useFileActions;