import ApiClient from '@/features/shared/controllers/ApiClient';
import { UserStore } from "@/features/users/store/User";

const UserController = {
    update: async (body : SubmitUpdateUserRequest, lang = 'ar') => {
        const res = await ApiClient.patch<SubmitUpdateUserRequest, SubmitUpdateUserResponse>('/api/user/update', body, lang);
        const user = UserStore.getState();
        user.updateUser(res);
        return res;
    },
    updatePassword: async (body : SubmitUpdatePasswordRequest, lang = 'ar') => {
        return await ApiClient.patch<SubmitUpdatePasswordRequest, SubmitUpdatePasswordResponse>('/api/user/update-password', body, lang);
    },

    updateAvatar: async (body: SubmitUpdateAvatarRequest, lang = 'ar') => {
        return await ApiClient.post<SubmitUpdateAvatarRequest, SubmitUpdateUserResponse>('/api/user/avatar', body, lang, 'multipart/form-data');
    },
    removeAvatar: async (lang = 'ar') => {
        const res = await ApiClient.delete<SubmitUpdateUserResponse>('/api/user/avatar', lang);
        const user = UserStore.getState();
        user.updateUser(res);
        return res;
    },

    updatePreferences: async (body : Partial<SubmitUpdatePreferencesRequest>, lang = 'ar') => {
        return await ApiClient.patch<Partial<SubmitUpdatePreferencesRequest>, SubmitUpdateUserResponse>('/api/user/preferences', body, lang);
    },
    getInfo: async (lang = 'ar') => {
        const user = UserStore.getState();
        const res = await ApiClient.get<null, GetUserResponse>("/api/user", null, lang);
        user.updateUser(res);
        return res;
    },
    deactivate: async (lang = 'ar') => {
        return await ApiClient.post<null, null>('/api/user/deactivate', null, lang);
    }
}

export default UserController;