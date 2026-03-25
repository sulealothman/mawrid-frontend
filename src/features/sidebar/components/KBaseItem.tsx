import React from 'react';
import { useI18n } from '@/features/localization/hooks/useI18n';
import { KnowledgeBaseIcon } from '@/features/knowledge-base/icons/KnowledgeBaseIcon';
import { DeleteIcon, EditIcon, MoreMenuIcon } from '@/features/shared/icons/CommonIcons';
import { Dropdown } from '@/features/shared/components/Dropdown/Dropdown';

interface KBaseItemProps {
  kb: KnowledgeBase;
  isActive: boolean;
  onSelect: (id: string) => void;
  setSelectedKb: (kb: KnowledgeBase) => void;
  setShowEditKbModal: (show: boolean) => void;
  setShowDeleteKbModal: (show: boolean) => void;
}

const KBaseItem: React.FC<KBaseItemProps> = ({
  kb,
  isActive,
  onSelect,
  setSelectedKb,
  setShowEditKbModal,
  setShowDeleteKbModal
}) => {
  const { t, isRTL } = useI18n();

  const handleClick = (): void => {
    onSelect(kb.id);
  };

  return (
    <div
      onClick={handleClick}
      className={`relative group cursor-pointer my-1 rounded-lg px-1 py-2 text-sm transition-colors group text-primary ${isActive
          ? 'bg-secondary'
          : 'hover:bg-secondary'
        }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${isActive ? 'bg-tertiary' : 'bg-secondary group-hover:bg-tertiary'} rounded-full`}>
              <KnowledgeBaseIcon className="size-5 shrink-0 stroke-primary" viewBox='0 0 24 24' />
            </div>
            <span className="font-medium truncate text-primary font-mixed">
              {kb.title}
            </span>
          </div>
        </div>
        <Dropdown className='w-7!'>
          <Dropdown.Button
            className={`ltr:ps-1 rtl:ps-0.5 rtl:pe-1 py-1 ${isActive ? 'flex' : 'hidden'} group-hover:flex group-active:flex items-center justify-center rounded-md hover:bg-tertiary transition-colors`}
          >
            <MoreMenuIcon viewBox='0 0 24 24' className="size-5 shrink-0 fill-secondary" />
          </Dropdown.Button>
          <Dropdown.Menu className="w-40" placement={isRTL ? "left" : "right"}>
            <Dropdown.Item onClick={(e) => {
              e?.stopPropagation();
              setSelectedKb(kb);
              setShowEditKbModal(true);
            }}>
              <EditIcon className="w-4 h-4 stroke-primary" viewBox='0 0 24 24' />
              <span className='text-primary'>{t('edit')}</span>
            </Dropdown.Item>
            <div className="border-t border-tertiary my-1"></div>
            <Dropdown.Item onClick={(e) => {
              e?.stopPropagation();
              setSelectedKb(kb);
              setShowDeleteKbModal(true);
            }} className="text-danger">
              <DeleteIcon className="w-4 h-4 stroke-danger" viewBox='0 0 24 24' />
              <span>{t('delete')}</span>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
};

export default KBaseItem;