import React, { useState } from 'react';
import { isAxiosError } from 'axios';
import { useI18n } from '@/features/localization/hooks/useI18n';
import CreateFileForm from './CreateFileForm';
import useFileValidator from '../../hooks/useFileValidator';

interface CreateFileContainerProps {
    kbId: string;
    createFileHandler: (file: CreateFileRequest) => void;
    isSubmitting: boolean;
    onCancel?: () => void;
}

const CreateFileContainer: React.FC<CreateFileContainerProps> = ({
    kbId,
    createFileHandler,
    isSubmitting,
    onCancel
}) => {
    const { t } = useI18n();
    const { fileValidator } = useFileValidator();
    
    const [filename, setFilename] = useState('');
    const [content, setContent] = useState('');
    const [errors, setErrors] = useState<string[]>([]);

    const onFilenameChange = (value: string) => {
        setFilename(value);
        if (errors.length) setErrors([]);
    };

    const onContentChange = (value: string) => {
        setContent(value);
        if (errors.length) setErrors([]);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const formData: CreateFileFormData = { filename, content, knowledge_base_id: kbId! };
        const validationErrors = fileValidator(formData);
        
        if (validationErrors.length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            await createFileHandler({ 
                content,
                filename,
                knowledge_base_id: kbId!
             });
            setFilename('');
            setContent('');
            setErrors([]);
        } catch (err: unknown) {
            if(isAxiosError(err)) {
                setErrors([err.message]);
            }
        }
    };
    return (
        <CreateFileForm
            filename={filename}
            content={content}
            onFilenameChange={onFilenameChange}
            onContentChange={onContentChange}
            onSubmit={handleSubmit}
            onCancel={onCancel}
            errors={errors}
            isSubmitting={isSubmitting}
            submitText={t("create")}
        />
    );
};

export default CreateFileContainer;