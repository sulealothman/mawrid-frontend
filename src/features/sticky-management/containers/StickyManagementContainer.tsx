import { useState } from 'react';
import StickyManagement from '../components/StickyManagement'
import useRedirect from '@/features/shared/hooks/useRedirect';
import useUploadActions from '@/features/files/hooks/useUploadActions';
import useFileActions from '@/features/files/hooks/useFileActions';
import CreateFileModal from '@/features/files/components/Modal/CreateFileModel';

interface StickyManagementContainerProps {
  kbId: string;
}

export default function StickyManagementContainer({
  kbId
}: StickyManagementContainerProps) {
  const [showCreateFileModal, setShowCreateFileModal] = useState(false);
  const { isUploading, handleFileUpload } = useUploadActions(kbId);
  const { createFile, isSubmitting} = useFileActions();
  const { redirectToNewChat } = useRedirect();

  return (
    <>
      <CreateFileModal
        showCreateFileModal={showCreateFileModal}
        closeCreateFileModal={() => setShowCreateFileModal(false)}
        createFileHandler={createFile}
        isSubmitting={isSubmitting}
        kbId={kbId}
      />
      <div className='fixed bottom-5 left-1/2 -translate-x-1/2 w-full max-w-sm p-2'>
        <div
        className='bg-light-100 dark:bg-midnight-900 border border-light-300/50 dark:border-midnight-700/50 shadow-md w-full p-2 rounded-2xl'>
        <StickyManagement
          newChatHandler={() => redirectToNewChat()}
          handleFileUpload={handleFileUpload}
          isUploading={isUploading}
          openCreateFileModal={() => setShowCreateFileModal(true)}
        />
      </div>
      </div>
    </>
  )
}
