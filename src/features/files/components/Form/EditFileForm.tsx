import React from 'react';
import Button from '@/features/shared/components/Button/Button';
import { useI18n } from '@/features/localization/hooks/useI18n';
import InputForm from '@/features/shared/components/Input/InputForm';

interface EditFileFormProps {
    title: string;
    onTitleChange: (value: string) => void;
    onSubmit: (e: React.FormEvent) => void;
    onCancel: () => void;
    errors: string[];
    isSubmitting: boolean;
}

const EditFileForm: React.FC<EditFileFormProps> = ({
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
                <InputForm
                    type="text"
                    testId="file-title-input"
                    label={t('rename_file')}
                    placeholder={t('file_name_placeholder')}
                    value={title}
                    setValue={onTitleChange}
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

export default EditFileForm;