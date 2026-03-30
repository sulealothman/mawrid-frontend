import { create } from 'zustand'

type DraftPendingMessageStoreType = {
    pendingMessage: string;
    session: ChatSession | null;
}

type DraftPendingMessageStoreActions = {
    setPendingState: (pendingMessage: string, session: ChatSession) => void;
    resetDraftPendingMessageStore: () => void;
}

const initialDraftPendingMessageStore: DraftPendingMessageStoreType = {
    pendingMessage: '',
    session: null,
}

export const DraftPendingMessageStore =  create<DraftPendingMessageStoreType & DraftPendingMessageStoreActions>()(
    (set) => ({
        ...initialDraftPendingMessageStore,
        setPendingState: (pendingMessage: string, session: ChatSession) => set(() => ({ pendingMessage, session })),
        resetDraftPendingMessageStore: () => set(() => ({ ...initialDraftPendingMessageStore }))
    }),
);