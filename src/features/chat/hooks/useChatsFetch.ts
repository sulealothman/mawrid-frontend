import { sortConversationsByMostRecent } from '@/features/shared/utils/common';
import ChatController from '../controller/ChatController';
import { useQuery } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import useCommonErrorAlertToast from '@/features/shared/hooks/useCommonErrorAlertToast';


const useChatsFetch = (kbId: string) => {
  const { somethingWentWrongAlert } = useCommonErrorAlertToast();
  const fetchChats = async () => {
    try {
      const response = await ChatController.index(kbId);
      return response.data || [];
    } catch (err: unknown) {
      if(isAxiosError(err)) {
        somethingWentWrongAlert();
      }
    }
  }

  const {data, isLoading} = useQuery({

    queryKey: ['chats', kbId],
    queryFn: fetchChats,
    enabled: !!kbId,
    refetchOnWindowFocus: false,
  });

  return {
    chats : data ? sortConversationsByMostRecent(data) : [],
    isLoading,
  };
};

export default useChatsFetch;