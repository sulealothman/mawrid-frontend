import React, { useState } from 'react';
import KnowledgeBaseForm from './KnowledgeBaseForm';
import useKnowledgeBaseValidator from '../../hooks/useKnowledgeBaseValidator';
import { isAxiosError } from 'axios';
import { useI18n } from '@/features/localization/hooks/useI18n';

interface EditKnowledgeBaseContainerProps {
    knowledgeBase: KnowledgeBase;
    editKbHandler: (newName: string, description: string) => void;
    onCancel: () => void;
    isSubmitting: boolean;
}

const EditKnowledgeBaseContainer: React.FC<EditKnowledgeBaseContainerProps> = ({
    knowledgeBase,
    editKbHandler,
    onCancel,
    isSubmitting
}) => {
    const { t } = useI18n();
    const { kbValidator } = useKnowledgeBaseValidator();
    
    const [title, setTitle] = useState(knowledgeBase.title);
    const [description, setDescription] = useState(knowledgeBase.description || '');
    const [errors, setErrors] = useState<string[]>([]);

    const onTitleChange = (value: string) => {
        setTitle(value);
        if (errors.length) setErrors([]);
    };

    const onDescriptionChange = (value: string) => {
        setDescription(value);
        if (errors.length) setErrors([]);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const formData: KnowledgeBaseFormData = { title, description };
        const validationErrors = kbValidator(formData);
        
        if (validationErrors.length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            await editKbHandler(title.trim(), description.trim());
            setErrors([]);
        } catch (err: unknown) {
            if(isAxiosError(err)) {
                setErrors([err.message]);
            }
        }
    };

    return (
        <KnowledgeBaseForm
            title={title}
            description={description}
            onTitleChange={onTitleChange}
            onDescriptionChange={onDescriptionChange}
            onSubmit={handleSubmit}
            onCancel={onCancel}
            errors={errors}
            isSubmitting={isSubmitting}
            submitText={t('save')}
        />
    );
};

export default EditKnowledgeBaseContainer;