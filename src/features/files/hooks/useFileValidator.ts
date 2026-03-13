import { useI18n } from "@/features/localization/hooks/useI18n";

const useFileValidator = () => {
    const { t } = useI18n();
    const fileValidator = (data: CreateFileFormData): string[] => {
        const errors: string[] = [];

        if (!data.filename || data.filename.trim().length < 1) {
            errors.push(t('filename_is_required'));
        }

        if (data.filename && data.filename.trim().length > 255) {
            errors.push(t('filename_must_not_exceed', { maxLength: 255 }));
        }

        if (data.content && data.content.trim().length > 1000) {
            errors.push(t('content_must_not_exceed', { maxLength: 1000 }));
        }

        return errors;
    };

    return {
        fileValidator,
    };
};

export default useFileValidator;