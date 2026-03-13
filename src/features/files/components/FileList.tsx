import React, { useState } from 'react';
import useFileActions from '../hooks/useFileActions';
import RenameFileModal from './Modal/RenameFileModal';
import DeleteFileModal from './Modal/DeleteFileModal';
import FileItem from './FileItem';

interface FileListProps {
    kbId: string;
    files: KnowledgeBaseFile[];
}

const FileList: React.FC<FileListProps> = ({
    kbId,
    files,
}) => {
    const [showEditFileModal, setShowEditFileModal] = useState(false);
    const [showDeleteFileModal, setShowDeleteFileModal] = useState(false);
    const [selectedFile, setSelectedFile] = useState<KnowledgeBaseFile | null>(null);

    const {
        isSubmitting,
        updateFile,
        deleteFile,
    } = useFileActions();


    const closeEditFileModal = () => {
        setShowEditFileModal(false);
        setSelectedFile(null);
    }

    const editFileHandler = async (newName: string) => {
        if (isSubmitting) return;

        if (selectedFile) {
            const response = await updateFile(kbId, selectedFile.id, { original_name: newName });
            if(response) {
                closeEditFileModal();
            }
        }
    };

    const deleteFileHandler = async (file: KnowledgeBaseFile) => {
        if (isSubmitting) return;
        await deleteFile(kbId, file.id);
        setShowDeleteFileModal(false);
        setSelectedFile(null);
    }

    return (
        <>
            {showEditFileModal && selectedFile && (
                <RenameFileModal
                    showEditFileModal={showEditFileModal}
                    closeEditFileModal={closeEditFileModal}
                    selectedFile={selectedFile}
                    editFileHandler={editFileHandler}
                    isSubmitting={isSubmitting}
                />
            )}

            {showDeleteFileModal && selectedFile && (
                <DeleteFileModal
                    showDeleteFileModal={showDeleteFileModal}
                    closeDeleteFileModal={() => setShowDeleteFileModal(false)}
                    selectedFile={selectedFile}
                    deleteFileHandler={deleteFileHandler}
                    isSubmitting={isSubmitting}
                    
                />
            )}
            <div className="overflow-y-auto custom-scrollbar">
                <div className='space-y-2 px-2'>
                    {files.map((file) => (
                    <FileItem
                        key={file.id}
                        file={file}
                        setSelectedFile={setSelectedFile}
                        setShowEditFileModal={setShowEditFileModal}
                        setShowDeleteFileModal={setShowDeleteFileModal}
                    />
                ))}
                </div>
            </div>
        </>
    );
};

export default FileList;