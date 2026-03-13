import { toast } from "@/features/shared/components/Toast/Toast";
import { useI18n } from "@/features/localization/hooks/useI18n";


const useFileAlertToast = () => {
    const { t } = useI18n();
    const showCreateFileSuccessToast = () => {
        toast({
            type: "success",
            message: t("file_created_successfully"),
        });
    }
    const showRenameFileSuccessToast = () => {
        toast({
            type: "success",
            message: t("file_renamed_successfully"),
        });
    }

    const showDeleteFileSuccessToast = () => {
        toast({
            type: "success",
            message: t("file_deleted_successfully"),
        });
    }

    const showErrorToast = (message: string) => {
        toast({
            type: "error",
            message: t(message),
        });
    }

    return {
        showCreateFileSuccessToast,
        showRenameFileSuccessToast,
        showDeleteFileSuccessToast,
        showErrorToast,
    }
}

export default useFileAlertToast;