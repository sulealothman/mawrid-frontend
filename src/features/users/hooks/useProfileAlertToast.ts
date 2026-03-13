import { useI18n } from "@/features/localization/hooks/useI18n";
import { toast } from "@/features/shared/components/Toast/Toast";


const useProfileAlertToast = () => {
    const { t } = useI18n();
    const showUpdatePasswordSuccessToast = () => {
        toast({
            type: "success",
            message: t("update_password_successfully"),
        });
    }
    const showProfileUpdateSuccessToast = () => {
        toast({
            type: "success",
            message: t("profile_update_successfully"),
        });
    }

    const showDeleteUserSuccessToast = () => {
        toast({
            type: "success",
            message: t("account_deactivated_successfully"),
        });
    }

    const showUpdateUserErrorToast = (text: string, options?: Record<string, string>) => {
        toast({
            type: "error",
            message: t(text, options),
        });
    }

    return {
        showUpdatePasswordSuccessToast,
        showProfileUpdateSuccessToast,
        showUpdateUserErrorToast,
        showDeleteUserSuccessToast,
    }
}

export default useProfileAlertToast;