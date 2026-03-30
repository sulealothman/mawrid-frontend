import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { isAxiosError } from 'axios';
import useChatAlertToast from './useChatAlertToast';
import useCommonErrorAlertToast from '@/features/shared/hooks/useCommonErrorAlertToast';
import useChatSocket from './useChatSocket';
import { useI18n } from '@/features/localization/hooks/useI18n';

type PersistedChatPayload = {
  chat_id: string;
  user_message: ChatMessage;
  reply_message: ChatMessage;
};

export const useChat = (kbId: string, initialSession?: ChatSession | null) => {
  const { t } = useI18n();
  const { somethingWentWrongAlert } = useCommonErrorAlertToast();
  const { showErrorToast } = useChatAlertToast();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [session, setSession] = useState<ChatSession | null>(initialSession || null);
  const [activeRequestId, setActiveRequestId] = useState<string | null>(null);

  const activeRequestIdRef = useRef<string | null>(null);
  const sessionRef = useRef<ChatSession | null>(initialSession || null);

  useEffect(() => {
    setSession(initialSession || null);
    sessionRef.current = initialSession || null;
  }, [initialSession]);

  const currentChatId = useMemo(() => {
    return session?.chat_id || '';
  }, [session?.chat_id]);

  const clearActiveRequest = useCallback(() => {
    activeRequestIdRef.current = null;
    setActiveRequestId(null);
  }, []);

  const handleDelta = useCallback((requestId: string, chunk: string) => {
    if (requestId !== activeRequestIdRef.current) return;

    setChatMessages((prev) => {
      const copy = [...prev];

      const lastAssistantIndex = [...copy]
        .reverse()
        .findIndex((message) => message.role === 'assistant' && !message.id);

      if (lastAssistantIndex === -1) return prev;

      const realIndex = copy.length - 1 - lastAssistantIndex;

      copy[realIndex] = {
        ...copy[realIndex],
        content: (copy[realIndex].content || '') + chunk,
      };

      return copy;
    });
  }, []);

  const applyPersistedMessages = useCallback((persisted: PersistedChatPayload | null) => {
    setIsSubmitting(false);
    if (!persisted) return;

    setChatMessages((prev) => {
      const copy = [...prev];

      const userIndex = copy.findIndex((message) => !message.id && message.role === 'user');
      if (userIndex !== -1) {
        copy[userIndex] = persisted.user_message;
      } else {
        copy.push(persisted.user_message);
      }

      const replyIndex = copy.findIndex(
        (message, index) =>
          index > userIndex &&
          !message.id &&
          (message.role === 'assistant' || message.role === 'system')
      );

      if (replyIndex !== -1) {
        copy[replyIndex] = persisted.reply_message;
      } else {
        copy.push(persisted.reply_message);
      }

      return copy;
    });
  }, []);

  const handleDone = useCallback(
    (requestId: string | null, data: PersistedChatPayload | null) => {
      if (requestId !== activeRequestIdRef.current) return;

      applyPersistedMessages(data);
      clearActiveRequest();
    },
    [applyPersistedMessages, clearActiveRequest]
  );

  const handleCancelled = useCallback(
    (requestId: string | null, data: PersistedChatPayload | null) => {
      if (requestId !== activeRequestIdRef.current) return;

      applyPersistedMessages(data);
      clearActiveRequest();
    },
    [applyPersistedMessages, clearActiveRequest]
  );

  const handleError = useCallback(
    (
      requestId: string | null,
      data: PersistedChatPayload | null,
      errorMessage: string | undefined
    ) => {
      if (requestId && requestId === activeRequestIdRef.current) {
        applyPersistedMessages(data);
        clearActiveRequest();
      }

      if (errorMessage) {
        showErrorToast(errorMessage);
      } else {
        somethingWentWrongAlert();
      }
    },
    [applyPersistedMessages, clearActiveRequest, showErrorToast, somethingWentWrongAlert]
  );

  const {
    isConnected,
    sendMessage: sendSocketMessage,
    cancelMessage: sendSocketCancelMessage,
    waitUntilConnected,
  } = useChatSocket({
    session,
    onDelta: handleDelta,
    onDone: handleDone,
    onCancelled: handleCancelled,
    onError: handleError,
  });

  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim() || !kbId || isSubmitting) return;

      try {
        const wsSession = sessionRef.current;

        if (!wsSession) {
          throw new Error('Chat session is not available');
        }

        setIsSubmitting(true);
        await waitUntilConnected();

        const requestId = crypto.randomUUID();
        activeRequestIdRef.current = requestId;
        setActiveRequestId(requestId);

        const userMessage: ChatMessage = {
          chat_id: wsSession.chat_id,
          role: 'user',
          content,
        };

        const assistantDraft: ChatMessage = {
          chat_id: wsSession.chat_id,
          role: 'assistant',
          content: '',
        };

        const history = [...chatMessages, userMessage].map((message) => ({
          role: message.role,
          content: message.content,
        }));

        setChatMessages((prev) => [...prev, userMessage, assistantDraft]);

        sendSocketMessage({
          requestId,
          chatId: wsSession.chat_id,
          kbId,
          message: content,
          messages: history,
        });
      } catch (error: unknown) {
        clearActiveRequest();

        if (isAxiosError(error) && error.response?.status === 422) {
          showErrorToast(error.response?.data?.errors?.[0]);
        } else {
          somethingWentWrongAlert();
        }

        setChatMessages((prev) => [
          ...prev,
          {
            chat_id: currentChatId,
            role: 'system',
            content: t('something_went_wrong_try_again'),
          },
        ]);
      }
    },
    [
      kbId,
      isSubmitting,
      waitUntilConnected,
      chatMessages,
      sendSocketMessage,
      clearActiveRequest,
      showErrorToast,
      somethingWentWrongAlert,
      currentChatId,
      t,
    ]
  );

  const cancelMessage = useCallback(() => {
    const requestId = activeRequestIdRef.current;

    if (!requestId) return;

    try {
      sendSocketCancelMessage(requestId);
    } catch {
      somethingWentWrongAlert();
    }
  }, [sendSocketCancelMessage, somethingWentWrongAlert]);

  return {
    sendMessage,
    cancelMessage,
    chatMessages,
    setChatMessages,
    isSubmitting,
    isConnected,
    activeRequestId,
  };
};