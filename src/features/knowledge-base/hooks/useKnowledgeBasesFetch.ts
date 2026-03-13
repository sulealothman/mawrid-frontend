import { useI18n } from '@/features/localization/hooks/useI18n';
import KnowledgeBaseController from '../controller/KnowledgeBaseController';
import { AuthStore } from '@/features/authenticate/store/Auth';
import { useQuery } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import useCommonErrorAlertToast from '@/features/shared/hooks/useCommonErrorAlertToast';

const useKnowledgeBasesFetch = () => {

    const { access_token } = AuthStore();
    const { somethingWentWrongAlert }= useCommonErrorAlertToast();
    const { language } = useI18n();

    const fetchKnowledgeBases = async () => {
        try {
            const response = await KnowledgeBaseController.index(language);
            return response;
        } catch (err: unknown) {
            if(isAxiosError(err)) {
                somethingWentWrongAlert();
            }
            somethingWentWrongAlert();
        }
    };

    const { data, isLoading, isError, refetch } = useQuery({
        enabled: !!access_token,
        queryKey: ['knowledgeBases'],
        queryFn: fetchKnowledgeBases,
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 5,
        placeholderData: (previousData) => previousData
    });


    return {
        kbs: data ?? {data: []},
        isError,
        isLoading,
        fetchKnowledgeBases: refetch,
    };
};

export default useKnowledgeBasesFetch;