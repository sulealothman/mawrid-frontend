import { toast } from "@/features/shared/components/Toast/Toast";
import { useI18n } from "@/features/localization/hooks/useI18n";


const useChatAlertToast = () => {
    const { t } = useI18n();
    const showCreateChatSuccessToast = () => {
        toast({
            type: "success",
            message: t("chat_created_successfully"),
        });
    }
    const showUpdateChatSuccessToast = () => {
        toast({
            type: "success",
            message: t("chat_updated_successfully"),
        });
    }

    const showDeleteChatSuccessToast = () => {
        toast({
            type: "success",
            message: t("chat_deleted_successfully"),
        });
    }

    const showErrorToast = (message: string) => {
        toast({
            type: "error",
            message: t(message),
        });
    }

    return {
        showCreateChatSuccessToast,
        showUpdateChatSuccessToast,
        showDeleteChatSuccessToast,
        showErrorToast,
    }
}

export default useChatAlertToast;