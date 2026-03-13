import React, { useState } from 'react';
import KBaseItem from './KBaseItem';
import useKnowledgeBaseActions from '@/features/knowledge-base/hooks/useKnowledgeActions';
import EditKbModal from '@/features/knowledge-base/components/Modal/EditKbModal';
import DeleteKbModal from '@/features/knowledge-base/components/Modal/DeleteKbModal';

interface KBaseListProps {
  kbList: KnowledgeBaseList
  activeKbId: string | null;
  onSelectKBase: (id: string) => void;
}

const KBaseList: React.FC<KBaseListProps> = ({
  kbList,
  activeKbId,
  onSelectKBase
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
    if(selectedKb) {
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
      <div className="flex-1 px-1">

        {kbList.data.map((kb) => (
          <KBaseItem
            key={kb.id}
            kb={kb}
            isActive={activeKbId === kb.id}
            onSelect={onSelectKBase}
            setSelectedKb={setSelectedKb}
            setShowEditKbModal={setShowEditKbModal}
            setShowDeleteKbModal={setShowDeleteKbModal}
          />
        ))}
      </div>
    </>
  );
};

export default KBaseList;