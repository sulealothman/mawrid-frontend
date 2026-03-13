import { useState } from 'react';
import ChatController from '../controller/ChatController';
import useChatAlertToast from './useChatAlertToast';
import { useQueryClient } from '@tanstack/react-query';
import { useI18n } from '@/features/localization/hooks/useI18n';
import { isAxiosError } from 'axios';
import useRedirect from '@/features/shared/hooks/useRedirect';
import useCommonErrorAlertToast from '@/features/shared/hooks/useCommonErrorAlertToast';


export const useChatActions = (kbId: string, chatId: string = '') => {
  const queryClient = useQueryClient();
  const { t, language } = useI18n();
  const { redirectToChat } = useRedirect();
  const { somethingWentWrongAlert } = useCommonErrorAlertToast();
  const {
    showUpdateChatSuccessToast,
    showDeleteChatSuccessToast,
    showErrorToast,
  } = useChatAlertToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chat, setChat] = useState<Chat>();

  const sendMessage = async (content: string) => {
    if (!content.trim() || !kbId) return;
const userMessage: ChatMessage = {
        chat_id: chatId || '',
        role: 'user',
        content,
      };
    try {
      const body: SendMessageRequest = {
        message: content,
        chat_id: chatId,
      };

      

      setChatMessages(prev => [
        ...prev,
        userMessage
      ]);
      const response = await ChatController.send(kbId, body);
      if (!response) return;
      if (!chatId) {
        redirectToChat(response.id!);
        return;
      }
      queryClient.setQueryData(['chat', kbId, response.id], (old: Chat | undefined) => {
        if (!old) return response;

        return {
          ...old,
          title: response.title,
          messages: [
            ...(old.messages ?? []),
            ...(response.messages ?? [])
          ]
        };
      });
      setChat(response);

      setChatMessages(prev => {
        const newMessages = response.messages ?? [];

        return [
          ...prev,
          ...newMessages.filter(
            m => !prev.some(p => p.id === m.id)
          )
        ];
      });
    } catch {
      queryClient.setQueryData(['chat', kbId, chatId], (old: Chat | undefined) => {
        if (!old) return old;

        return {
          ...old,
          messages: [
            ...(old.messages ?? []),
            userMessage,
            {
              chat_id: chatId,
              role: 'system',
              content: t('something_went_wrong_try_again')
            }
          ]
        };
      });
      setChatMessages(prev => [
        ...prev,
        userMessage,
        {
          chat_id: chatId || '',
          role: 'system',
          content: t('something_went_wrong_try_again')
        }
      ]);
    }
  }

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
    chat,
    sendMessage,
    chatMessages,
    setChatMessages,
    updateChat,
    deleteChat,
    isSubmitting,
  };
};