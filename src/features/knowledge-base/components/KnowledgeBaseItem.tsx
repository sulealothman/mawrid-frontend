import { useI18n } from '@/features/localization/hooks/useI18n';
import { DeleteIcon, EditIcon } from '@/features/shared/icons/CommonIcons';

interface KnowledgeBaseItemProps {
    kb: KnowledgeBase;
    onSelect: (kb: KnowledgeBase) => void;
    setSelectedKb: (kb: KnowledgeBase) => void;
    setShowEditKbModal: (show: boolean) => void;
    setShowDeleteKbModal: (show: boolean) => void;
}
export default function KnowledgeBaseItem({
    kb,
    onSelect,
    setSelectedKb,
    setShowEditKbModal,
    setShowDeleteKbModal
}: KnowledgeBaseItemProps) {
    const { t } = useI18n();
    
    return (
        <div
            key={kb.id}
            className="bg-neutral-100 dark:bg-neutral-900 shadow-md border border-neutral-300/50 dark:border-neutral-700/50 rounded-lg p-2 md:p-4 transition-colors cursor-pointer"
            onClick={() => onSelect(kb)}
        >
            <div className="flex justify-between items-start">
                <div className="flex-1">
                    <h3 className="text-base md:text-lg font-semibold text-primary mb-1 font-noto-sans-arabic">
                        {kb.title}
                    </h3>
                    {kb.description && (
                        <p className="text-secondary text-sm mb-2 line-clamp-2 font-noto-sans-arabic">
                            {kb.description}
                        </p>
                    )}
                    <div className="flex items-center gap-4 text-xs text-secondary">
                        <span>
                            {kb.files_count || 0} {t('files')}
                        </span>
                        <span>
                            {t('created')} {new Date(kb.created_at).toLocaleDateString()}
                        </span>
                    </div>
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setSelectedKb(kb);
                            setShowEditKbModal(true);
                        }}
                        className="p-2"
                        title={t('edit')}
                    >
                        <EditIcon className="w-4 h-4 icon-stroke hover:dark:stroke-neutral-400 cursor-pointer duration-200" viewBox='0 0 24 24' />
                    </button>

                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setSelectedKb(kb);
                            setShowDeleteKbModal(true);
                        }}
                        className="p-2 text-neutral-400 hover:text-red-400 transition-colors"
                        title={t('delete')}
                    >
                        <DeleteIcon className="w-4 h-4 icon-stroke hover:stroke-red-400 cursor-pointer duration-200" viewBox='0 0 24 24' />
                    </button>
                </div>
            </div>
        </div>
    )
}
