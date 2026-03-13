import { create } from 'zustand'
import { persist } from 'zustand/middleware';

type AuthStoreActions = {
    setToken: (access_token: string) => void
    resetToken: () => void
}

const initialAuthStore: Auth = {
    access_token: ''
}

export const AuthStore =  create<Auth & AuthStoreActions>()(persist(
    (set) => ({
        ...initialAuthStore,
        setToken: (access_token: string) => set(() => ({ access_token })),
        resetToken: () => set(() => ({ access_token: '' }))
    }),
    {
        name: 'access_token',
    }
));