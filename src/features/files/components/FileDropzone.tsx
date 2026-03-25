import React from 'react';
import { useI18n } from '@/features/localization/hooks/useI18n';
import { formatFileSize } from '../utils/utils';
import { UploadCloudIcon } from '../icons/FileIcons';
import useDragDropFiles from '../hooks/useDragDropFiles';
import ListProgress from '@/features/shared/components/Progress/ListProgress';
import { ALLOWED_FILE_TYPES } from '@/features/shared/constants/allowedFileTypes';
import { MAX_FILE_SIZE } from '@/features/shared/constants/maxFileSize';

interface FileDropzoneProps {
    cancelUpload: (id: string) => void
    handleFileUpload: (files: FileList) => void
    files: UploadItem[]
    isUploading: boolean;
}

const FileDropzone: React.FC<FileDropzoneProps> = ({
    cancelUpload,
    handleFileUpload,
    isUploading,
    files
}) => {
    const { t } = useI18n();

    const {
        isDragOver,
        fileInputRef,
        handleDragEnter,
        handleDragLeave,
        handleDragOver,
        handleDrop,
        handleFileInput,
        openFileDialog,
    } = useDragDropFiles({
        isUploading,
        handleFileUpload,
    });

    return (
        <div className="space-y-4">
            <div
                className={`
                     dropzone
                    ${isDragOver && !isUploading
                        ? 'dropzone-dragover'
                        : ''
                    }
                    ${isUploading ? 'opacity-50 cursor-not-allowed' : 'dropzone-hover'}
                `}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={openFileDialog}
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    multiple={true}
                    accept={ALLOWED_FILE_TYPES.map(type => `.${type}`).join(',')}
                    onChange={handleFileInput}
                    className="hidden"
                    disabled={isUploading}
                />

                <div className="space-y-4">
                    <div className="mx-auto w-12 h-12">
                        <UploadCloudIcon className="w-full h-full stroke-secondary" viewBox='0 0 24 24' />
                    </div>

                    <div>
                        <p className="md:text-lg text-primary">
                            {isDragOver
                                ? t('drop_files_here')
                                : t('drag_drop_files')
                            }
                        </p>
                        <p className="text-xs md:text-sm text-tertiary">
                            {t('or_click_to_browse')}
                        </p>
                    </div>

                    <div className="text-xs text-muted">
                        <p>
                            {t('supported_formats', {allowedExtensions: ALLOWED_FILE_TYPES.map(type => type.toUpperCase()).join(', ')})}
                        </p>
                        <p>
                            {t('max_file_size', {maxSize: formatFileSize(MAX_FILE_SIZE)})}
                        </p>
                    </div>
                </div>

                {isUploading && files.length > 0 && (
                    <ListProgress listProgress={files.map(file => ({
                        id: file.id,
                        name: file.file.name,
                        progress: file.progress,
                    }))} cancelHandler={cancelUpload} />
                )}
            </div>
        </div>
    );
};

export default FileDropzone;