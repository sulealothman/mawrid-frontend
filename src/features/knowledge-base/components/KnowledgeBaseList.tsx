import React, { useState } from 'react';
import useKnowledgeBaseActions from '../hooks/useKnowledgeActions';
import EditKbModal from './Modal/EditKbModal';
import DeleteKbModal from './Modal/DeleteKbModal';
import KnowledgeBaseItem from './KnowledgeBaseItem';

interface KnowledgeBaseListProps {
    knowledgeBases: KnowledgeBaseList;
    onSelect: (kb: KnowledgeBase) => void;
}

const KnowledgeBaseList: React.FC<KnowledgeBaseListProps> = ({
    knowledgeBases,
    onSelect,
}) => {
    const {
        isSubmitting,
        updateKnowledgeBase,
        deleteKnowledgeBase,
    } = useKnowledgeBaseActions();

    const [showEditKbModal, setShowEditKbModal] = useState(false);
    const [showDeleteKbModal, setShowDeleteKbModal] = useState(false);
    const [selectedKb, setSelectedKb] = useState<KnowledgeBase | null>(null);

    const closeEditFileModal = () => {
        setShowEditKbModal(false);
        setSelectedKb(null);
    }

    const editKbHandler = async (newName: string, description: string) => {
        if (isSubmitting) return;

        if (selectedKb) {
            const response = await updateKnowledgeBase(selectedKb.id, { title: newName, description });
            if(response) {
                closeEditFileModal();
            }
        }
    }

    const deleteKbHandler = async (kb: KnowledgeBase) => {
        if (isSubmitting) return;
        
        try {
            await deleteKnowledgeBase(kb.id);
            setShowDeleteKbModal(false);
            setSelectedKb(null);
        } catch {
        }
    }


    return (
        <>
            {showEditKbModal && selectedKb && (

                <EditKbModal
                    showEditKbModal={showEditKbModal}
                    closeEditKbModal={closeEditFileModal}
                    selectedKb={selectedKb}
                    editKbHandler={editKbHandler}
                    isSubmitting={isSubmitting}
                />

            )}

            {showDeleteKbModal && selectedKb && (

                <DeleteKbModal
                    showDeleteKbModal={showDeleteKbModal}
                    closeDeleteKbModal={() => {
                        setShowDeleteKbModal(false);
                        setSelectedKb(null);
                    }}
                    selectedKb={selectedKb}
                    deleteKbHandler={deleteKbHandler}
                    isSubmitting={isSubmitting}
                />

            )}
            <div className="space-y-3">
                {knowledgeBases.data.length > 0 && knowledgeBases.data.map((kb) => (
                    <KnowledgeBaseItem
                        key={kb.id}
                        kb={kb}
                        onSelect={onSelect}
                        setSelectedKb={setSelectedKb}
                        setShowEditKbModal={setShowEditKbModal}
                        setShowDeleteKbModal={setShowDeleteKbModal}
                    />
                ))}
            </div>
        </>
    );
};

export default KnowledgeBaseList;