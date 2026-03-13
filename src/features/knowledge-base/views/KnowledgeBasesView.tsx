import Button from '@/features/shared/components/Button/Button'
import KnowledgeBaseList from '../components/KnowledgeBaseList'
import { useI18n } from '@/features/localization/hooks/useI18n';
import useKnowledgeBaseActions from '../hooks/useKnowledgeActions';
import { useState } from 'react';
import CreateKbModal from '../components/Modal/CreateKbModal';
import useRedirect from '@/features/shared/hooks/useRedirect';
import { KBStore } from '../store/KBStore';

interface KnowledgeBasesViewProps {
    knowledgeBases: KnowledgeBaseList | undefined;
    handleSelectKb: (kb: KnowledgeBase) => void;
}

export default function KnowledgeBasesView({
    knowledgeBases,
    handleSelectKb,
}: KnowledgeBasesViewProps) {

    const {t} = useI18n();

    const { setKbId } = KBStore();
    const { redirectToKnowledgeBase } = useRedirect();

    const [createKbModal, setCreateKbModal] = useState(false);
    const {
        isSubmitting,
        createKnowledgeBase,
    } = useKnowledgeBaseActions();

    const createKbHandler = async (kb: CreateKnowledgeBaseRequest) => {
        if(isSubmitting) return;
        const response = await createKnowledgeBase({ title: kb.title, description: kb.description || undefined });
        if(response && response.id) {
            setKbId(response.id);
            setCreateKbModal(false);
            redirectToKnowledgeBase(response.id);
        }
    }


  return (
    <>

    {createKbModal && (
        <CreateKbModal
            showCreateKbModal={createKbModal}
            closeCreateKbModal={() => setCreateKbModal(false)}
            createKbHandler={createKbHandler}
            isSubmitting={isSubmitting}
        />
    )}

    <div className="w-full font-mixed">
            <div className="max-w-6xl mx-auto px-2 md:px-6 py-8 max-md:pt-10">
                <div className="flex justify-between items-start mb-8">
                    <div>
                        <h1 className="text-xl md:text-3xl font-bold text-primary mb-2">
                            {t('knowledge_bases')}
                        </h1>
                        <p className="text-secondary max-md:text-sm">
                            {t('kb_description')}
                        </p>
                    </div>
                    
                    <Button
                        onClick={() => setCreateKbModal(true)}
                        className="max-md:text-sm"
                    >
                        <span className='hidden md:block'>{t('create_knowledge_base')}</span>
                        <span className='block md:hidden'>{t('create')}</span>
                    </Button>
                </div>

                <KnowledgeBaseList
                    knowledgeBases={knowledgeBases as KnowledgeBaseList}
                    onSelect={handleSelectKb}
                />

            </div>
        </div>
    </>
  )
}
