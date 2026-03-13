import React, { useState, useEffect } from 'react';
import EditFileForm from './EditFileForm';
import { useI18n } from '@/features/localization/hooks/useI18n';

interface EditKnowledgeBaseContainerProps {
    file: KnowledgeBaseFile;
    editFileHandler: (newName: string) => void;
    onCancel: () => void;
    isSubmitting: boolean;
}

const EditFileContaianer: React.FC<EditKnowledgeBaseContainerProps> = ({
    file,
    editFileHandler,
    onCancel,
    isSubmitting,
}) => {
    const {t} = useI18n();
    
    const [title, setTitle] = useState(file.name);
    const [errors, setErrors] = useState<string[]>([]);

    useEffect(() => {
        setTitle(file.name);
    }, [file]);

    const onTitleChange = (value: string) => {
        setTitle(value);
        if (errors.length) setErrors([]);
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if(title === file.name) {
            return;
        }

        if(title.trim() === '') {
            setErrors([t('file_name_must_not_be_empty')]);
            return;
        }

        editFileHandler(title.trim());

    };

    return (
        <EditFileForm
            title={title}
            onTitleChange={onTitleChange}
            onSubmit={handleSubmit}
            onCancel={onCancel}
            errors={errors}
            isSubmitting={isSubmitting}
            
        />
    );
};

export default EditFileContaianer;