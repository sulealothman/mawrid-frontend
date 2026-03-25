import { useI18n } from '@/features/localization/hooks/useI18n';
import { getCountLabel } from '@/features/localization/utils/countLabel';
import Button from '@/features/shared/components/Button/Button';
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
            className="bg-accent shadow-md border border-secondary rounded-lg p-2 md:p-4 transition-colors cursor-pointer"
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
                            {getCountLabel(t, 'files', kb.files_count || 0)}
                        </span>
                        <span>
                            {t('created')} {new Date(kb.created_at).toLocaleDateString()}
                        </span>
                    </div>
                </div>

                <div className="flex gap-2">
                    <Button
                        onClick={(e) => {
                            e.stopPropagation();
                            setSelectedKb(kb);
                            setShowEditKbModal(true);
                        }}
                        className="p-2"
                        title={t('edit')}
                        variant="noStyle"
                    >
                        <EditIcon className="w-4 h-4 stroke-primary hover:stroke-secondary cursor-pointer duration-200" viewBox='0 0 24 24' />
                    </Button>

                    <Button
                        onClick={(e) => {
                            e.stopPropagation();
                            setSelectedKb(kb);
                            setShowDeleteKbModal(true);
                        }}
                        className="p-2"
                        title={t('delete')}
                        variant="noStyle"
                    >
                        <DeleteIcon className="w-4 h-4 stroke-primary hover:stroke-danger cursor-pointer duration-200" viewBox='0 0 24 24' />
                    </Button>
                </div>
            </div>
        </div>
    )
}
