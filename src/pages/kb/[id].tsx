import { useRouter } from 'next/router';
import useKnowledgeBaseFetch from '@/features/knowledge-base/hooks/useKnowledgeBaseFetch';
import KnowledgeBaseView from '@/features/knowledge-base/views/KnowledgeBaseView';
import { ReactNode } from 'react';
import Layout from '@/features/shared/layout/DefaultLayout';
import Heads from '@/features/shared/template/Heads';
import KnowledgeBaseLoadingView from '@/features/knowledge-base/views/KnowledgeBaseLoadingView';
import ErrorView from '@/features/shared/views/ErrorView';

export default function KnowledgeBaseDetailPage() {
    const router = useRouter();
    const { isReady, query } = router;
    const { id } = query;
    const kbId = id as string;

    const {
        kb,
        isLoading: kbLoading,
        isError,
        fetchKnowledgeBase
    } = useKnowledgeBaseFetch(kbId, isReady);


    if (kbLoading) {
        return (
            <KnowledgeBaseLoadingView />
        );
    }

    if (isError) {
        return (
            <ErrorView callbackFunc={fetchKnowledgeBase} />
        );
    }

    return (
        <>
            <Heads title={kb?.title} />
            <KnowledgeBaseView
                kb={kb!}
            />
        </>
    );
};

KnowledgeBaseDetailPage.getLayout = (page: ReactNode) => <Layout>{page}</Layout>;