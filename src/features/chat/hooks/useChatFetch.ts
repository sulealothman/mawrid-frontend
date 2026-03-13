import { isAxiosError } from 'axios';
import ChatController from '../controller/ChatController';
import { useQuery } from '@tanstack/react-query';
import useCommonErrorAlertToast from '@/features/shared/hooks/useCommonErrorAlertToast';


const useChatFetch = (kbId: string, chatId: string, isReady: boolean) => {
  const { somethingWentWrongAlert } =useCommonErrorAlertToast();
  const fetchChats = async (chatId: string) => {
    try {
      const response = await ChatController.show(chatId);
      return response || [];
    } catch (err: unknown) {
      if(isAxiosError(err)) {
        somethingWentWrongAlert();
      }
      somethingWentWrongAlert();
    }
  }

  const {data, isError, isLoading, isFetched, refetch} = useQuery({

    queryKey: ['chat', kbId, chatId],
    queryFn: () => fetchChats(chatId),
    enabled: !!kbId && !!chatId && isReady,
    refetchOnWindowFocus: false,
  });

  return {
    chat: data,
    isLoading,
    isFetched,
    isError,
    fetchChat: refetch,
  };
};

export default useChatFetch;