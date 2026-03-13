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
                     border-2 border-dashed rounded-lg px-2 md:px-8 py-2 text-center transition-all duration-200 cursor-pointer
                    ${isDragOver && !isUploading
                        ? 'border-neutral-400 bg-neutral-900'
                        : 'border-neutral-600 hover:border-neutral-500'
                    }
                    ${isUploading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-neutral-300 dark:hover:bg-neutral-700'}
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
                        <UploadCloudIcon className="w-full h-full icon-stroke" viewBox='0 0 24 24' />
                    </div>

                    <div>
                        <p className="md:text-lg text-primary">
                            {isDragOver
                                ? t('drop_files_here')
                                : t('drag_drop_files')
                            }
                        </p>
                        <p className="text-xs md:text-sm text-neutral-500">
                            {t('or_click_to_browse')}
                        </p>
                    </div>

                    <div className="text-xs text-neutral-500">
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