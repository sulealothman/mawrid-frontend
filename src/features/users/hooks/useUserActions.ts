import UserController from "@/features/users/controller/UserController";
import { UserStore } from "@/features/users/store/User";
import useProfileAlertToast from "./useProfileAlertToast";
import { useI18n } from "@/features/localization/hooks/useI18n";
import { isAxiosError } from "axios";
import useCommonErrorAlertToast from "@/features/shared/hooks/useCommonErrorAlertToast";
import { formatFileSize } from "@/features/files/utils/utils";
import { MAX_IMAGE_FILE_SIZE } from "@/features/shared/constants/maxFileSize";
import useAuth from "@/features/authenticate/hooks/useAuth";


const useUserActions = () => {
    const { language } = useI18n();
    const user = UserStore((state) => state);
    const { logout } = useAuth();
    const {somethingWentWrongAlert} = useCommonErrorAlertToast();
    const {
        showUpdatePasswordSuccessToast,
        showProfileUpdateSuccessToast,
        showUpdateUserErrorToast,
        showDeleteUserSuccessToast,
    } = useProfileAlertToast();


    const updateUserInformation = async (body: SubmitUpdateUserRequest) => {
        try {
            const response = await UserController.update(body, language);
            if(response) {
                user.updateUser(response);
                showProfileUpdateSuccessToast();
                return true;
            }
        } catch (error: unknown) {
            if(isAxiosError(error) && error.response?.status === 422) {
                showUpdateUserErrorToast(error.response.data.errors[0]);
                return false;
            }
            somethingWentWrongAlert();
            return false;
        }
        return false;
    }

    const updatePreferences = async (body: Partial<SubmitUpdatePreferencesRequest>) => {

        try {
            const response = await UserController.updatePreferences(body, language);
            if(response) {
                user.updateUser(response);
            }
        } catch {}
    }

    const uploadAvatar = async (file: File) => {
        try {
            
            const response = await UserController.updateAvatar({image: file}, language);
            if(response) {
                user.updateUser(response);
                return response.avatar;
            }
        } catch (error: unknown) {
            if(isAxiosError(error) && error.response?.status === 422) {
                showUpdateUserErrorToast(error.response.data.errors[0], {maxSize: formatFileSize(MAX_IMAGE_FILE_SIZE)});
                return false;
            }
            somethingWentWrongAlert();
            return false;
        }
        return false;
    }

    const removeAvatar = async () => {
        try {
            if(!user.avatar) return false;
            const response = await UserController.removeAvatar(language);
            if(response) {
                user.removeAvatar();
                return true;
            }
        } catch (error: unknown) {
            if(isAxiosError(error) && error.response?.status === 422) {
                somethingWentWrongAlert();
                return false;
            }
            somethingWentWrongAlert();
            return false;
        }
        return false;
    }

    const updatePassword = async (body: SubmitUpdatePasswordRequest) => {
        try {
            const response = await UserController.updatePassword(body, language);

            if(response) {
                showUpdatePasswordSuccessToast();
                return true;
            }
        } catch (error: unknown) {
            if(isAxiosError(error) && error.response?.status === 422) {
                showUpdateUserErrorToast(error.response.data.errors[0]);
                return false;
            }
            somethingWentWrongAlert();
            return false;
        }
        return false;
    }

    const deactivateAccount = async () => {
        showDeleteUserSuccessToast();
        try {
            const response = await UserController.deactivate(language);
            if(response) {
                logout(false);
                return true;
            }
        } catch {
            logout(false);
            somethingWentWrongAlert();
            return false;
        }
        return false;
    }

    return {
        updateUserInformation,
        updatePreferences,
        uploadAvatar,
        removeAvatar,
        updatePassword,
        deactivateAccount,
    }
}

export default useUserActions;