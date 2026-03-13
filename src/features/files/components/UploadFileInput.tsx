import React, { useCallback, useRef } from 'react';
import Button from '@/features/shared/components/Button/Button';
import { UploadFileIcon } from '../icons/FileIcons';
import { ALLOWED_FILE_TYPES } from '@/features/shared/constants/allowedFileTypes';

interface UploadFileInputProps {
    handleFileUpload: (files: FileList) => void
    isUploading: boolean;
}

const UploadFileInput: React.FC<UploadFileInputProps> = ({
    handleFileUpload,
    isUploading
}) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileInput = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            await handleFileUpload(files);
        }
    }, [handleFileUpload]);

    const onClick = () => {
        if (!isUploading && fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    return (
        <>
            <Button
                onClick={onClick}
                disabled={isUploading}
                variant='secondary'
                className='rounded-full size-10 md:size-12 flex items-center justify-center'
            >
                <UploadFileIcon className="size-4 md:size-6 icon-stroke" viewBox='0 0 24 24' />
            </Button>
            <input
                ref={fileInputRef}
                type="file"
                multiple={true}
                accept={ALLOWED_FILE_TYPES.map(type => `.${type}`).join(',')}
                onChange={handleFileInput}
                className="hidden"
                disabled={isUploading}
            />
        </>

    );
};

export default UploadFileInput;