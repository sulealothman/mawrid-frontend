import { useI18n } from '@/features/localization/hooks/useI18n';
import KnowledgeBaseController from '../controller/KnowledgeBaseController';
import { AuthStore } from '@/features/authenticate/store/Auth';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import useCommonErrorAlertToast from '@/features/shared/hooks/useCommonErrorAlertToast';
import useRedirect from '@/features/shared/hooks/useRedirect';

const useKnowledgeBaseFetch = (kbId: string, isReady: boolean) => {
    const { somethingWentWrongAlert, notFoundAlert } = useCommonErrorAlertToast();
    const { redirectToKnowledgeBaseIndex } = useRedirect();
    const queryClient = useQueryClient();

    const { access_token } = AuthStore();
    const { language } = useI18n();

    const fetchKnowledgeBase = async (kbId: string) => {
        try {
            const response = await KnowledgeBaseController.show(kbId, language);
            return response;
        } catch (err: unknown) {
            if (isAxiosError(err) && err.response?.status === 404) {
                notFoundAlert();
                redirectToKnowledgeBaseIndex();
                return;
            }
            somethingWentWrongAlert();
        }
    };

    const { data, error, isPending, isLoading, isError, refetch } = useQuery<KnowledgeBase | undefined>({
        enabled: !!access_token && !!isReady,
        queryKey: ['knowledgeBase', kbId],
        queryFn: fetchKnowledgeBase.bind(null, kbId),
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 5,
        placeholderData: (previousData) => previousData,
        refetchInterval: (query) => {
            const hasPendingFiles = query.state.data?.files?.some(
                (file) => file.status === 'queued' || file.status === 'processing'
            );

            return hasPendingFiles ? 10000 : false;
        },
    }, queryClient);


    return {
        kb: data,
        error,
        isLoading: isPending || isLoading,
        isError,
        fetchKnowledgeBase: refetch,
    };
};

export default useKnowledgeBaseFetch;