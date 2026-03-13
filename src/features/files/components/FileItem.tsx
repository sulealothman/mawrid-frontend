import { useI18n } from '@/features/localization/hooks/useI18n';
import { DeleteIcon, EditIcon } from '@/features/shared/icons/CommonIcons';
import React from 'react'

interface FileItemProps {
    file: KnowledgeBaseFile;
    setSelectedFile: (file: KnowledgeBaseFile | null) => void;
    setShowEditFileModal: (show: boolean) => void;
    setShowDeleteFileModal: (show: boolean) => void;
}

export default function FileItem({
    file,
    setSelectedFile,
    setShowEditFileModal,
    setShowDeleteFileModal
}: FileItemProps) {
    const { t } = useI18n();
    return (
        <div
            key={file.id}
            className="bg-neutral-100 dark:bg-neutral-900 shadow-md border border-neutral-300/50 dark:border-neutral-700/50 rounded-lg p-4 transition-colors cursor-pointer"
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 flex-1 min-w-0">
                    <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-primary truncate font-noto-sans-arabic">
                            {file.name}
                        </h4>
                        <div className="flex items-center gap-3 text-xs text-secondary mt-1">
                            <span>
                                {t('created')} {new Date(file.created_at).toLocaleDateString()}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setSelectedFile(file);
                            setShowEditFileModal(true);
                        }}
                        className="p-2"
                        title={t('edit')}
                    >
                        <EditIcon className="w-4 h-4 icon-stroke hover:dark:stroke-neutral-400 cursor-pointer duration-200" viewBox='0 0 24 24' />
                    </button>

                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setSelectedFile(file);
                            setShowDeleteFileModal(true);
                        }}
                        className="p-2"
                        title={t('delete')}
                    >
                        <DeleteIcon className="w-4 h-4 icon-stroke hover:stroke-red-400 cursor-pointer duration-200" viewBox='0 0 24 24' />
                    </button>
                </div>
            </div>
        </div>
    )
}
