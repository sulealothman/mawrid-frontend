import UploadFileInput from '@/features/files/components/UploadFileInput';
import { BlankFileIcon } from '@/features/files/icons/FileIcons';
import { useI18n } from '@/features/localization/hooks/useI18n';
import Button from '@/features/shared/components/Button/Button'

interface StickyManagementProps {
    newChatHandler: () => void;
    handleFileUpload: (files: FileList) => void;
    isUploading: boolean;
    openCreateFileModal: () => void;
    canStartNewChat: boolean;
}

export default function StickyManagement({
    newChatHandler,
    handleFileUpload,
    isUploading,
    canStartNewChat,
    openCreateFileModal
}: StickyManagementProps) {
    const { t } = useI18n();
    return (
        <div className='w-full flex gap-2'>
            <Button className='flex-1 rounded-xl max-md:text-sm' onClick={newChatHandler} disabled={!canStartNewChat}>
                {t('new_chat')}
            </Button>
            <UploadFileInput
                handleFileUpload={handleFileUpload}
                isUploading={isUploading}            
            />

            <Button onClick={openCreateFileModal} variant='secondary' shape='circle' className='size-10 md:size-12 flex items-center justify-center'>
                <BlankFileIcon className="size-4 md:size-6 stroke-primary" viewBox='0 0 24 24' />
            </Button>
        </div>
    )
}
