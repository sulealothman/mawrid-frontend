import { ChatIcon } from '@/features/knowledge-base/icons/KnowledgeBaseIcon';
import { useI18n } from '@/features/localization/hooks/useI18n';
import Button from '@/features/shared/components/Button/Button';

interface ChatsEmptyProps {
    canStartNewChat?: boolean;
    newChatHandler: () => void;
}

export default function ChatsEmpty({ canStartNewChat, newChatHandler }: ChatsEmptyProps) {
    const { t } = useI18n();
    return (
        <div className="text-center py-8 text-muted flex flex-col justify-center items-center gap-4">
            <div className='flex gap-4 items-center'>
                <ChatIcon className="size-10 stroke-muted" viewBox='0 0 24 24' />
                <span className="text-2xl font-semibold">{t('no_conversations')}</span>
            </div>

            <Button onClick={newChatHandler} disabled={!canStartNewChat}>
                {t('new_chat')}
            </Button>
        </div>
    )
}
