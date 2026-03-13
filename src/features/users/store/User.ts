import { create } from 'zustand'


type UserStoreActions = {
    setUser: (user: User) => void
    updateUser: (user: Partial<User>) => void
    updateAvatar: (avatar: string) => void
    removeAvatar: () => void
    resetUser: () => void
}

const initialUserStore: User = {
    id: 0,
    name: '',
    email: '',
    phone: '',
    avatar: '',
    created_at: '',
    access_token: '',
    preferences: null
}

export const UserStore = create<User & UserStoreActions>()(
    (set) => ({
        ...initialUserStore,
        setUser: (user: User) => set(() => ({ ...user })),
        updateUser: (user: Partial<User>) => set((state) => ({ ...state, ...user })),
        updateAvatar: (avatar: string) => set((state) => ({ ...state, avatar })),
        removeAvatar: () => set((state) => ({ ...state, avatar: '' })),
        resetUser: () => set(() => ({ ...initialUserStore }))

    })
);

