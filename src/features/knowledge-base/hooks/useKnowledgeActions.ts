import { useState } from 'react';
import { useI18n } from '@/features/localization/hooks/useI18n';
import KnowledgeBaseController from '../controller/KnowledgeBaseController';
import { useQueryClient } from '@tanstack/react-query';
import useKbAlertToast from './useKbAlertToast';
import { isAxiosError } from 'axios';

const useKnowledgeBaseActions = () => {
    const queryClient = useQueryClient();
    const { language } = useI18n();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        showCreateKbSuccessToast,
        showUpdateKbSuccessToast,
        showDeleteKbSuccessToast,
        showErrorToast
    } = useKbAlertToast();


    const createKnowledgeBase = async (data: CreateKnowledgeBaseRequest) => {
        try {
            setIsSubmitting(true);
            const response = await KnowledgeBaseController.store(data, language);
            if (response) {
                showCreateKbSuccessToast();
                queryClient.invalidateQueries({
                    queryKey: ['knowledgeBases'],
                });
            }
            return response;
        } catch (err: unknown) {
            if(isAxiosError(err)) {
              showErrorToast(err?.message);
            }
            return null;
        } finally {
            setIsSubmitting(false);
        }
    };

    const updateKnowledgeBase = async (kbId: string, data: UpdateKnowledgeBaseRequest) => {
        try {
            setIsSubmitting(true);
            const response = await KnowledgeBaseController.update(kbId, data, language);
            if (response) {
                showUpdateKbSuccessToast();
                queryClient.invalidateQueries({
                    queryKey: ['knowledgeBases'],
                });
            }
            return response;
        } catch (err: unknown) {
            if(isAxiosError(err)) {
              showErrorToast(err?.message);
            }
            return null;
        } finally {
            setIsSubmitting(false);
        }
    };

    const deleteKnowledgeBase = async (kbId: string) => {
        try {
            setIsSubmitting(true);
            
            const response = await KnowledgeBaseController.remove(kbId, language);
            if (response) {
                showDeleteKbSuccessToast();
                queryClient.invalidateQueries({
                    queryKey: ['knowledgeBases'],
                });
            }
        } catch (err: unknown) {
            if(isAxiosError(err)) {
              showErrorToast(err?.message);
            }
            return null;
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        // State
        isSubmitting,

        // Actions
        createKnowledgeBase,
        updateKnowledgeBase,
        deleteKnowledgeBase
    };
};

export default useKnowledgeBaseActions;