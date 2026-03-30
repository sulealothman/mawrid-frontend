import { useState } from 'react';
import ChatController from '../controller/ChatController';
import useChatAlertToast from './useChatAlertToast';
import { useQueryClient } from '@tanstack/react-query';
import { useI18n } from '@/features/localization/hooks/useI18n';
import { isAxiosError } from 'axios';
import useCommonErrorAlertToast from '@/features/shared/hooks/useCommonErrorAlertToast';
import { DraftPendingMessageStore } from '../store/DraftPendingMessageStore';
import useRedirect from '@/features/shared/hooks/useRedirect';


export const useChatActions = (kbId: string) => {
  const queryClient = useQueryClient();
  const { language } = useI18n();
  const { setPendingState} = DraftPendingMessageStore();
  const { replaceToChat } = useRedirect();
  const { somethingWentWrongAlert } = useCommonErrorAlertToast();
  const {
    showUpdateChatSuccessToast,
    showDeleteChatSuccessToast,
    showErrorToast,
  } = useChatAlertToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const createChat = async (message: string) => {
    try {
      setIsSubmitting(true);
      const response = await ChatController.store(kbId, language);
      if (response?.session && response.id) {
        setPendingState(message, response.session);
        replaceToChat(response.id);
      }
      return response;
    } catch (err: unknown) {
      if (isAxiosError(err) && err.response?.status === 422) {
        showErrorToast(err?.response?.data?.errors[0]);
        return null;
      }
      somethingWentWrongAlert();
      return null;
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateChat = async (chatId: string, data: UpdateChatRequest) => {
    try {
      setIsSubmitting(true);
      const response = await ChatController.update(chatId, data, language);
      if (response) {
        showUpdateChatSuccessToast();
        queryClient.invalidateQueries({
          queryKey: ['knowledgeBase', kbId],
        });
        queryClient.invalidateQueries({
          queryKey: ['chat', kbId, chatId],
        });
      }
      return response;
    } catch (error: unknown) {
      if (isAxiosError(error) && error.response?.status === 422) {
        showErrorToast(error?.response?.data?.errors[0]);
        return null;
      }
      somethingWentWrongAlert();
      return null;
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteChat = async (chatId: string) => {
    try {
      setIsSubmitting(true);

      const response = await ChatController.remove(chatId, language);
      if (response) {
        showDeleteChatSuccessToast();
        queryClient.invalidateQueries({
          queryKey: ['knowledgeBase', kbId],
        });
      }
    } catch (error: unknown) {
      if (isAxiosError(error) && error.response?.status === 404) {
        showErrorToast("chat_not_found");
        return;
      }
      somethingWentWrongAlert();
    } finally {
      setIsSubmitting(false);
    }
  };
  return {
    createChat,
    updateChat,
    deleteChat,
    isSubmitting,
  };
};