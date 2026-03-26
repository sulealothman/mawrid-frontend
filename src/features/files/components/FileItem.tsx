import { FileIcon } from '@/features/knowledge-base/icons/KnowledgeBaseIcon';
import { useI18n } from '@/features/localization/hooks/useI18n';
import Badge from '@/features/shared/components/Badge/Badge';
import Button from '@/features/shared/components/Button/Button';
import { DeleteIcon, EditIcon } from '@/features/shared/icons/CommonIcons';

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
            className="bg-accent shadow-md border border-secondary rounded-lg p-4 transition-colors cursor-pointer group"
        >
            <div className="flex items-center justify-start gap-2">
                <div className='flex items-center justify-center p-3 rounded-xl duration-200 bg-tertiary dark:bg-secondary group-hover:bg-quaternary group-hover:dark:bg-tertiary'>
                    <FileIcon className="size-4 md:size-6 shrink-0 stroke-secondary" viewBox='0 0 24 24' />
                </div>
                <div className="flex items-center space-x-3 flex-1 min-w-0">
                    <div className="flex-1 min-w-0">
                        <div className='flex items-center gap-3'>
                            <h4 className="text-sm font-medium text-primary truncate font-noto-sans-arabic">
                                {file.name}
                            </h4>
                            {file.status === 'failed' && <Badge text={t('processing_failed')} variant='danger' size='sm' />}
                            {file.status !== 'failed' && file.status !== 'processed' && (
                                <div className='bg-amber-500 w-2 h-2 rounded-full flex items-center justify-center'>
                                    <div className='bg-amber-500 w-3 h-3 rounded-full animate-ping shrink-0'></div>
                                </div>
                            )}
                        </div>

                        <div className="flex items-center gap-3 text-xs text-tertiary mt-1">
                            <span>
                                {t('created')} {new Date(file.created_at).toLocaleDateString()}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex gap-2">
                    <Button
                        onClick={(e) => {
                            e.stopPropagation();
                            setSelectedFile(file);
                            setShowEditFileModal(true);
                        }}
                        className="p-2"
                        title={t('edit')}
                        variant="noStyle"
                    >
                        <EditIcon className="w-4 h-4 stroke-primary hover:dark:stroke-secondary cursor-pointer duration-200" viewBox='0 0 24 24' />
                    </Button>

                    <Button
                        onClick={(e) => {
                            e.stopPropagation();
                            setSelectedFile(file);
                            setShowDeleteFileModal(true);
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
