import React from 'react';
import Button from '@/features/shared/components/Button/Button';
import { useI18n } from '@/features/localization/hooks/useI18n';
import InputForm from '@/features/shared/components/Input/InputForm';
import InputTextareaForm from '@/features/shared/components/Input/InputTextareaForm';

interface KnowledgeBaseFormProps {
    title: string;
    description: string;
    onTitleChange: (value: string) => void;
    onDescriptionChange: (value: string) => void;
    onSubmit: (e: React.FormEvent) => void;
    onCancel?: () => void;
    errors: string[];
    isSubmitting: boolean;
    submitText?: string;
    showCancel?: boolean;
}

const KnowledgeBaseForm: React.FC<KnowledgeBaseFormProps> = ({
    title,
    description,
    onTitleChange,
    onDescriptionChange,
    onSubmit,
    onCancel,
    errors,
    isSubmitting,
    submitText = 'Save',
    showCancel = true
}) => {
    const { t } = useI18n();

    return (
        <div className="space-y-6">
            <div className="space-y-4">
                <InputForm
                    type="text"
                    label="kb_title_label"
                    testId="kb-title"
                    placeholder={t('kb_title_placeholder')}
                    value={title}
                    setValue={(value) => onTitleChange(value)}
                    disabled={isSubmitting}
                />
                <InputTextareaForm
                    label="kb_description_label"
                    testId="kb-description"
                    placeholder={t('kb_description_placeholder')}
                    value={description}
                    setValue={(value) => onDescriptionChange(value)}
                    disabled={isSubmitting}
                    minRows={6}
                    rows={4}
                    maxRows={6}
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

            <div className="flex gap-3">
                <Button
                    onClick={onSubmit}
                    disabled={isSubmitting}
                    isLoading={isSubmitting}
                >
                    {t(submitText) || submitText}
                </Button>

                {showCancel && onCancel && (
                    <Button
                        onClick={onCancel}
                        disabled={isSubmitting}
                        variant='tertiary'
                        className='shadow-none'
                    >
                        {t('cancel')}
                    </Button>
                )}
            </div>
        </div>
    );
};

export default KnowledgeBaseForm;