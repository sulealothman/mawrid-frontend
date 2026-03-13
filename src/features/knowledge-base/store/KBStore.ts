import { create } from 'zustand'
import { persist } from 'zustand/middleware';



type KBStore = {
    kb_id: string; // UUID
}

type KBStoreActions = {
    setKbId: (kb_id: string) => void
    resetKbId: () => void
}

const initialKBStore: KBStore = {
    kb_id: ''
}

export const KBStore =  create<KBStore & KBStoreActions>()(persist(
    (set) => ({
        ...initialKBStore,
        setKbId: (kb_id: string) => set(() => ({ kb_id })),
        resetKbId: () => set(() => ({ kb_id: '' }))
    }),
    {
        name: 'kb_id',
    }
));