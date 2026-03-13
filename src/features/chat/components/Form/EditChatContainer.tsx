import React, { useState, useEffect } from 'react';
import EditChatForm from './EditChatForm';
import { useI18n } from '@/features/localization/hooks/useI18n';

interface EditChatContainerProps {
    chat: Chat;
    editChatHandler: (newName: string) => void;
    onCancel: () => void;
    isSubmitting: boolean;
}

const EditChatContainer: React.FC<EditChatContainerProps> = ({
    chat,
    editChatHandler,
    onCancel,
    isSubmitting,
}) => {
    const {t} = useI18n();
    const [title, setTitle] = useState(chat.title);
    const [errors, setErrors] = useState<string[]>([]);

    useEffect(() => {
        setTitle(chat.title);
    }, [chat]);

    const onTitleChange = (value: string) => {
        setTitle(value);
        if (errors.length) setErrors([]);
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if(title === chat.title) {
            return;
        }

        if(title.trim() === '') {
            setErrors([t('title_cannot_be_empty')]);
            return;
        }

        editChatHandler(title.trim());

    };

    return (
        <EditChatForm
            title={title}
            onTitleChange={onTitleChange}
            onSubmit={handleSubmit}
            onCancel={onCancel}
            errors={errors}
            isSubmitting={isSubmitting}
        />
    );
};

export default EditChatContainer;