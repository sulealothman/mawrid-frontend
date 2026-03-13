import ApiClient from '@/features/shared/controllers/ApiClient';
import { UserStore } from "@/features/users/store/User";
import { AuthStore } from '../store/Auth';

const AuthController = {
    store: async (body : SubmitRegisterUserRequest, lang = 'ar') => {
        const res = await ApiClient.post<SubmitRegisterUserRequest, SubmitLoginResponse>('/api/auth/register', body, lang);
        const user = UserStore.getState();
        const auth = AuthStore.getState();
        auth.setToken(res.access_token);
        user.setUser(res);
        return res;
    },
    auth: async (body : SubmitLoginRequest, lang = 'ar') => {
        const res = await ApiClient.post<SubmitLoginRequest, SubmitLoginResponse>('/api/auth/login', body, lang);
        const user = UserStore.getState();
        const auth = AuthStore.getState();
        auth.setToken(res.access_token);
        user.setUser(res);
        return res;
    },

    logout: async (lang = 'ar') => {
        const user = UserStore.getState();
        const res = await ApiClient.post<null, null>('/api/auth/logout', null, lang);
        const auth = AuthStore.getState();
        auth.resetToken();
        user.resetUser();
        return res;
    },
    requestResetPassword: async (email:string, lang = 'ar') => {
        return await ApiClient.post<SubmitReqResetPasswordRequest, SubmitReqResetPasswordResponse>('/api/auth/password/forgot', {
            email
        }, lang);
    },
    resetPassword: async (body : SubmitResetPasswordRequest, lang = 'ar') => {
        const res = await ApiClient.post<SubmitResetPasswordRequest, SubmitResetPasswordResponse>('/api/auth/password/reset', body, lang);
        return res;
    },
}

export default AuthController;