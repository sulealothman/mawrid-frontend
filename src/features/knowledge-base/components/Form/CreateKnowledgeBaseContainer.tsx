import React, { useState } from 'react';
import KnowledgeBaseForm from '@/features/knowledge-base/components/Form/KnowledgeBaseForm';
import useKnowledgeBaseValidator from '@/features/knowledge-base/hooks/useKnowledgeBaseValidator';
import { isAxiosError } from 'axios';
import { useI18n } from '@/features/localization/hooks/useI18n';

interface CreateKnowledgeBaseContainerProps {
    createKbHandler: (kb: CreateKnowledgeBaseRequest) => void;
    isSubmitting: boolean;
    onCancel?: () => void;
}

const CreateKnowledgeBaseContainer: React.FC<CreateKnowledgeBaseContainerProps> = ({
    createKbHandler,
    isSubmitting,
    onCancel
}) => {
    const { t } = useI18n();
    const { kbValidator } = useKnowledgeBaseValidator();
    
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
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
            await createKbHandler({ title, description: description || undefined });
            setTitle('');
            setDescription('');
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
            submitText={t("create")}
        />
    );
};

export default CreateKnowledgeBaseContainer;