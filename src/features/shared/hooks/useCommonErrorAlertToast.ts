
import { useI18n } from "@/features/localization/hooks/useI18n";
import { toast } from "../components/Toast/Toast";


const useCommonErrorAlertToast = () => {
    const { t } = useI18n();
    const badRequestAlert = () => {
        toast({
            type: "error",
            message: t("bad_request"),
        });
    }
    const unauthorizedAlert = () => {
        toast({
            type: "error",
            message: t("unauthorized"),
        });
    }

    const notFoundAlert = () => {
        toast({
            type: "error",
            message: t("not_found"),
        });
    }

    const notFoundEmailAlert = () => {
        toast({
            type: "error",
            message: t("email_not_found"),
        });
    }

    const notFoundPageAlert = () => {
        toast({
            type: "error",
            message: t("page_not_found"),
        });
    }

    const unprocessableEntityAlert = () => {
        toast({
            type: "error",
            message: t("unprocessable_entity"),
        });
    }

    const tooManyRequestsAlert = () => {
        toast({
            type: "error",
            message: t("too_many_requests"),
        });
    }

    const somethingWentWrongAlert = () => {
        toast({
            type: "error",
            message: t("something_went_wrong"),
        });
    }


    return {
        badRequestAlert,
        unauthorizedAlert,
        notFoundAlert,
        notFoundEmailAlert,
        notFoundPageAlert,
        unprocessableEntityAlert,
        tooManyRequestsAlert,
        somethingWentWrongAlert
    };
}

export default useCommonErrorAlertToast;