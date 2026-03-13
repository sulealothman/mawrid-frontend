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
      className={`relative group cursor-pointer my-1 rounded-lg px-1 py-2 text-sm transition-colors group ${isActive
          ? 'bg-neutral-300 dark:bg-neutral-700 text-primary'
          : 'text-neutral-300 hover:bg-neutral-300 dark:hover:bg-neutral-700'
        }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-3">
            <KnowledgeBaseIcon className="size-5 shrink-0 icon-stroke" viewBox='0 0 24 24' />
            <span className="font-medium truncate text-primary font-mixed">
              {kb.title}
            </span>
          </div>
        </div>
        <Dropdown className='w-7!'>
          <Dropdown.Button
            className={`ltr:ps-1 rtl:ps-0.5 rtl:pe-1 py-1 ${isActive ? 'flex' : 'hidden'} group-hover:flex group-active:flex items-center justify-center rounded-md hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors`}
          >
            <MoreMenuIcon viewBox='0 0 24 24' className="size-5 shrink-0 icon-fill" />
          </Dropdown.Button>
          <Dropdown.Menu className="w-40!" placement={isRTL ? "left" : "right"}>
            <Dropdown.Item onClick={(e) => {
              e?.stopPropagation();
              setSelectedKb(kb);
              setShowEditKbModal(true);
            }}>
              <EditIcon className="w-4 h-4 icon-stroke" viewBox='0 0 24 24' />
              <span className='text-primary font-semibold'>{t('edit')}</span>
            </Dropdown.Item>
            <div className="border-t border-neutral-700 my-1"></div>
            <Dropdown.Item onClick={(e) => {
              e?.stopPropagation();
              setSelectedKb(kb);
              setShowDeleteKbModal(true);
            }} className="text-red-400! font-semibold">
              <DeleteIcon className="w-4 h-4 stroke-red-400" viewBox='0 0 24 24' />
              <span>{t('delete')}</span>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
};

export default KBaseItem;