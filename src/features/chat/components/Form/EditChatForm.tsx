import React from 'react';
import Input from '@/features/shared/components/Input/Input';
import Button from '@/features/shared/components/Button/Button';
import { useI18n } from '@/features/localization/hooks/useI18n';

interface EditChatFormProps {
    title: string;
    onTitleChange: (value: string) => void;
    onSubmit: (e: React.FormEvent) => void;
    onCancel: () => void;
    errors: string[];
    isSubmitting: boolean;
}

const EditChatForm: React.FC<EditChatFormProps> = ({
    title,
    onTitleChange,
    onSubmit,
    onCancel,
    errors,
    isSubmitting,
}) => {
    const { t } = useI18n();

    return (
        <div className="space-y-6 w-full">
            <div className="space-y-4 w-full">
                <Input
                    type="text"
                    placeholder={t('chat_title_placeholder')}
                    value={title}
                    onChange={(e) => onTitleChange(e.target.value)}
                    disabled={isSubmitting}
                    className='w-full'
                />

                {errors.length > 0 && (
                    <div className="space-y-1">
                        {errors.map((error, index) => (
                            <p key={index} className="text-red-400 text-sm">
                                {error}
                            </p>
                        ))}
                    </div>
                )}
            </div>

            <div className="flex gap-3 w-full">
                <Button
                    onClick={onSubmit}
                    disabled={isSubmitting}
                    isLoading={isSubmitting}
                >
                    {t('save')}
                </Button>


                <Button
                    onClick={onCancel}
                    disabled={isSubmitting}
                    variant='secondary'
                >
                    {t('cancel')}
                </Button>
            </div>
        </div>
    );
};

export default EditChatForm;