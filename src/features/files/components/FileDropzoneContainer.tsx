import useUploadActions from '../hooks/useUploadActions';
import FileDropzone from './FileDropzone';

interface FileDropzoneContainerProps {
    kbId: string;
}

export default function FileDropzoneContainer({ kbId }: FileDropzoneContainerProps) {

    const { uploads, isUploading, cancelUpload, handleFileUpload } = useUploadActions(kbId);

    return (
        <FileDropzone
            cancelUpload={cancelUpload}
            handleFileUpload={handleFileUpload}
            isUploading={isUploading}
            files={uploads}

        />
    )
}
