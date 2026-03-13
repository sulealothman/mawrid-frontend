import { formatFileSize } from "@/features/files/utils/utils";
import { useI18n } from "@/features/localization/hooks/useI18n";
import { ALLOWED_FILE_TYPES } from "@/features/shared/constants/allowedFileTypes";
import { MAX_FILE_SIZE } from "@/features/shared/constants/maxFileSize";

const useKnowledgeBaseValidator = () => {
    const { t } = useI18n();
    const kbValidator = (data: KnowledgeBaseFormData): string[] => {
        const errors: string[] = [];

        if (!data.title || data.title.trim().length < 2) {
            errors.push(t('kb_title_must_not_be_empty'));
        }

        if (data.title && data.title.trim().length > 100) {
            errors.push(t('kb_title_must_not_exceed', { maxLength: 100 }));
        }

        if (data.description && data.description.trim().length > 300) {
            errors.push(t('kb_description_must_not_exceed', { maxLength: 300 }));
        }

        return errors;
    };

    const fileValidator = (data: CreateFileFormData): string[] => {
        const errors: string[] = [];

        if (!data.filename || data.filename.trim().length < 1) {
            errors.push(t('filename_is_required'));
        }

        if (data.filename && data.filename.trim().length > 255) {
            errors.push(t('filename_must_not_exceed', { maxLength: 255 }));
        }

        if (!data.content || data.content.trim().length < 1) {
            errors.push(t('content_is_required'));
        }

        return errors;
    };

    const uploadValidator = (file: File): string[] => {
        const errors: string[] = [];
        const allowedExtensions = ALLOWED_FILE_TYPES;
        const maxSize = MAX_FILE_SIZE;

        if (!file) {
            errors.push(t('file_is_required'));
            return errors;
        }

        const extension = file.name.split('.').pop()?.toLowerCase();
        if (!extension || !allowedExtensions.includes(extension)) {
            errors.push(t('file_type_not_supported', { allowedExtensions: allowedExtensions.join(', ')}));
        }

        if (file.size > maxSize) {
            errors.push(t('file_size_exceeded', { maxSize: formatFileSize(MAX_FILE_SIZE) }));
        }

        return errors;
    };

    return {
        kbValidator,
        fileValidator,
        uploadValidator
    };
};

export default useKnowledgeBaseValidator;