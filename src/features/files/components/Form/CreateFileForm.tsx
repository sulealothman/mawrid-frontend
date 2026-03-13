import React from 'react';
import Button from '@/features/shared/components/Button/Button';
import { useI18n } from '@/features/localization/hooks/useI18n';
import InputForm from '@/features/shared/components/Input/InputForm';
import InputTextareaForm from '@/features/shared/components/Input/InputTextareaForm';

interface CreateFileFormProps {
    filename: string;
    content: string;
    onFilenameChange: (value: string) => void;
    onContentChange: (value: string) => void;
    onSubmit: (e: React.FormEvent) => void;
    onCancel?: () => void;
    errors: string[];
    isSubmitting: boolean;
    submitText?: string;
    showCancel?: boolean;
}

const CreateFileForm: React.FC<CreateFileFormProps> = ({
    filename,
    content,
    onFilenameChange,
    onContentChange,
    onSubmit,
    onCancel,
    errors,
    isSubmitting,
    submitText = 'Save',
    showCancel = true
}) => {
    const { t } = useI18n();

    return (
        <div className="space-y-6 flex flex-col justify-between h-full">
            <div className="space-y-4 flex flex-col h-full">
                <InputForm
                    type="text"
                    label="filename_label"
                    testId="filename"
                    placeholder={t('filename_placeholder')}
                    value={filename}
                    setValue={(value) => onFilenameChange(value)}
                    disabled={isSubmitting}
                />
                <InputTextareaForm
                    label="content_file_label"
                    testId="content"
                    className='flex-1'
                    placeholder={t('content_file_placeholder')}
                    value={content}
                    setValue={(value) => onContentChange(value)}
                    disabled={isSubmitting}
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
                        variant='secondary'
                    >
                        {t('cancel')}
                    </Button>
                )}
            </div>
        </div>
    );
};

export default CreateFileForm;