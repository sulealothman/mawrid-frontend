import { UserStore } from "@/features/users/store/User"
import AuthController from "../controller/AuthController";
import { AuthStore } from "../store/Auth";
import UserController from "@/features/users/controller/UserController";
import useRedirect from "@/features/shared/hooks/useRedirect";
import { isDarkMode } from "@/features/theme/utils/retreiveTheme";
import useAuthAlertToast from "./useAuthAlertToast";
import { useSetTheme } from "@/features/theme/hooks/useSetTheme";
import { useState } from "react";
import useHandleError from "@/features/shared/hooks/useHandleError";
import { useI18n } from "@/features/localization/hooks/useI18n";
import { isAxiosError } from "axios";
import { clearCache } from "@/features/shared/cache/useCache";


const useAuth = () => {

    const { lang, setLanguage } = useI18n();
    const {errorsHandle, isErrorResponse, hasErrorsResponse} = useHandleError();
    const { showRegisterSuccessToast, showLoginSuccessToast, showLogoutSuccessToast, showErrorToast } = useAuthAlertToast();
    const user = UserStore();
    const { resetToken } = AuthStore();
    const {redirectToHome, redirectToAuthenticate} = useRedirect();
    const { setTheme} = useSetTheme();
    const [isLoading, setIsLoading] = useState(false);


    const register = async (name: string, email: string, password: string, phone: string) => {
        try {
            const _isDarkMode = isDarkMode();
            const response = await AuthController.store({
                name,
                email,
                password,
                phone,
                dark_mode: _isDarkMode,
                language: lang
            }, lang);
            if (response) {
                showRegisterSuccessToast();
                redirectToHome();
                
                return true;
            }
            return false;
        } catch (err: unknown) {
            if (isAxiosError(err)) {
                const error = err.response?.data;
                if(hasErrorsResponse(error)) {
                return error;
            }
            if (isErrorResponse(error)) {
                return showErrorToast(error.message as string);
            }
            return errorsHandle(error);
            }
        }
    }
    const login = async (email: string, password: string) => {
        try {
            const _isDarkMode = isDarkMode();
            const response = await AuthController.auth({email, password}, lang);

            if (response) {
                if(response?.preferences?.dark_mode && !_isDarkMode) setTheme('dark');
                else if(!response?.preferences?.dark_mode && _isDarkMode) setTheme('light');
                if(response.preferences?.language && response.preferences.language !== lang) await setLanguage(response.preferences.language);
                
                showLoginSuccessToast();
                redirectToHome();
                return true;
            }
            return false;
        } catch (err: unknown) {
            if (isAxiosError(err)) {
                const error = err.response?.data;
                if (isErrorResponse(error)) {
                return showErrorToast(error.message as string);
            }
            return errorsHandle(error);
            }
        }
    }
    const logout = async (showAlert: boolean = true) => {

        if (showAlert) showLogoutSuccessToast();
        try {
            const response = await AuthController.logout();
            user.resetUser();
            resetToken();
            redirectToAuthenticate();
            clearCache();
            return response;
        } catch {
            user.resetUser();
            resetToken();
            redirectToAuthenticate();
            clearCache();
            return false;
        }
    }

    const existUserDataOrRetrieve = async () => {
        try {
            if(!user.access_token) {
                UserController.getInfo();
            }
        } catch (err: unknown) {
            if(isAxiosError(err) && err.response?.status === 401) {
                logout(false);
            }
            return null;
        }
    }

    const forgotPassword = async (email: string) : Promise<SubmitReqResetPasswordResponse | ErrorRequestResponse | 500 | 429> => {
        try {
            setIsLoading(true);
            const response = await AuthController.requestResetPassword(email, lang);
            setIsLoading(false);
            return response;
        } catch (err: unknown) {
            setIsLoading(false);
            if(isAxiosError(err)) {
                const error = err.response?.data;
                if (isErrorResponse(error)) {
                showErrorToast(error.message as string);
            }
            return errorsHandle(error);
            }
            return 500;
            
        }
    }

    const resetPassword = async (token: string, email: string, password: string, password_confirmation: string) => {
        try {
            const response = await AuthController.resetPassword({token, email, password, password_confirmation}, lang);
            if(response) return true;
            return false;
        } catch (err: unknown) {
            if(isAxiosError(err)) {
                const error = err.response?.data;
                if(hasErrorsResponse(error)) {
                return error;
            }
            if (isErrorResponse(error)) {
                return showErrorToast(error.message as string);
            }
            return errorsHandle(error);
            }
        }
    }

    return {
        register,
        login,
        logout,
        existUserDataOrRetrieve,
        forgotPassword,
        resetPassword,
        isLoading,
    }

}

export default useAuth;