import { toast } from "@/features/shared/components/Toast/Toast";
import { useI18n } from "@/features/localization/hooks/useI18n";


const useAuthAlertToast = () => {
    const { t } = useI18n();
    const showRegisterSuccessToast = () => {
        toast({
            type: "success",
            message: t("register_successfully"),
        });
    }
    const showLoginSuccessToast = () => {
        toast({
            type: "success",
            message: t("login_successfully"),
        });
    }

    const showLogoutSuccessToast = () => {
        toast({
            type: "success",
            message: t("logout_successfully"),
        });
    }

    const showErrorToast = (message: string) => {
        toast({
            type: "error",
            message: t(message),
        });
    }

    return {
        showRegisterSuccessToast,
        showLoginSuccessToast,
        showLogoutSuccessToast,
        showErrorToast,
    }
}

export default useAuthAlertToast;