import { toast } from "@/features/shared/components/Toast/Toast";
import { useI18n } from "@/features/localization/hooks/useI18n";


const useKbAlertToast = () => {
    const { t } = useI18n();
    const showCreateKbSuccessToast = () => {
        toast({
            type: "success",
            message: t("kb_created_successfully"),
        });
    }
    const showUpdateKbSuccessToast = () => {
        toast({
            type: "success",
            message: t("kb_updated_successfully"),
        });
    }

    const showDeleteKbSuccessToast = () => {
        toast({
            type: "success",
            message: t("kb_deleted_successfully"),
        });
    }

    const showErrorToast = (message: string) => {
        toast({
            type: "error",
            message: t(message),
        });
    }

    return {
        showCreateKbSuccessToast,
        showUpdateKbSuccessToast,
        showDeleteKbSuccessToast,
        showErrorToast,
    }
}

export default useKbAlertToast;