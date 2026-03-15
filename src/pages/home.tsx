import { ReactNode } from 'react';
import { useI18n } from '@/features/localization/hooks/useI18n';
import useKnowledgeBasesFetch from '@/features/knowledge-base/hooks/useKnowledgeBasesFetch';
import useRedirect from '@/features/shared/hooks/useRedirect';
import { KBStore } from '@/features/knowledge-base/store/KBStore';
import KnowledgeBasesView from '@/features/knowledge-base/views/KnowledgeBasesView';
import Layout from '@/features/shared/layout/DefaultLayout';
import useAuthMount from '@/features/authenticate/hooks/useAuthMount';
import Heads from '@/features/shared/template/Heads';
import KnowledgeBasesLoadingView from '@/features/knowledge-base/views/KnowledgeBasesLoadingView';
import ErrorView from '@/features/shared/views/ErrorView';

export default function Home() {
    const { t } = useI18n();
    const { isMounted } = useAuthMount();
    const { setKbId } = KBStore();
    const { kbs: knowledgeBases, isError, isLoading, fetchKnowledgeBases } = useKnowledgeBasesFetch();

    const { redirectToKnowledgeBase } = useRedirect();

    const handleSelectKb = (kb: KnowledgeBase) => {
        setKbId(kb.id);
        redirectToKnowledgeBase(kb.id);
    };


    if (isLoading || !isMounted) {
        return (
            <KnowledgeBasesLoadingView />
        );
    }

    if (isError) {
        return (
            <ErrorView callbackFunc={fetchKnowledgeBases} />
        );
    }

    return (
        <>
            <Heads title={t('knowledge_bases')} />

            <KnowledgeBasesView
                knowledgeBases={knowledgeBases}
                handleSelectKb={handleSelectKb}
            />
        </>

    );
};

Home.getLayout = (page: ReactNode) => <Layout>{page}</Layout>;