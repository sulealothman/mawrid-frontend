import FileList from '@/features/files/components/FileList';
import { useI18n } from '@/features/localization/hooks/useI18n';
import useRedirect from '@/features/shared/hooks/useRedirect';
import FileDropzoneContainer from '@/features/files/components/FileDropzoneContainer';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@/features/shared/components/Tabs/Tabs';
import ChatsList from '@/features/chat/components/ChatsList';
import { ChatIcon, FileIcon } from '../icons/KnowledgeBaseIcon';
import DefaultNavbar from '@/features/navbar/components/DefaultNavbar';
import StickyManagementContainer from '@/features/sticky-management/containers/StickyManagementContainer';
import SmallBadge from '@/features/shared/components/Badge/SmallBadge';
import ChatsEmpty from '@/features/chat/components/ChatsEmpty';

interface KnowledgeBaseViewProps {
    kb: KnowledgeBase;
}

export default function KnowledgeBaseView({
    kb,
}: KnowledgeBaseViewProps) {
    const { t } = useI18n();
    const { redirectToKnowledgeBaseIndex } = useRedirect();

    return (
        <div className="w-full font-mixed">
            <DefaultNavbar
                title={kb.title}
                backHandler={() => redirectToKnowledgeBaseIndex()}
            />
            <div className="mx-auto md:px-4 py-4">

                <div className="flex justify-between items-start p-2 pb-4">

                    {kb.description && (
                        <p className="text-secondary max-w-2xl">
                            {kb.description}
                        </p>
                    )}
                </div>

                <TabGroup>
                    <TabList className='px-2'>
                        <Tab>
                            <div className='flex items-center gap-2 capitalize text-primary'>
                                <FileIcon className="size-4 icon-stroke" viewBox='0 0 24 24' />
                                {t('files')}
                                {kb?.files && kb.files.length > 0 && <SmallBadge text={`${kb.files.length}`} />}
                            </div>
                        </Tab>
                        <Tab>
                            <div className='flex items-center gap-2 capitalize text-primary'>
                                <ChatIcon className="size-4 icon-stroke" viewBox='0 0 24 24' />
                                {t('chats')}
                                {kb?.chats && kb.chats.length > 0 && <SmallBadge text={`${kb.chats.length}`} />}
                            </div>
                        </Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <div className='flex flex-col gap-2 max-h-[80vh] pb-32 md:pb-10'>
                                <div className="space-y-6 px-2">
                                    <FileDropzoneContainer
                                        kbId={kb.id}
                                    />
                                </div>
                                {kb?.files && kb.files.length > 0 && (
                                    <FileList
                                        kbId={kb.id}
                                        files={kb.files}
                                    />
                                )}

                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div className='flex flex-col max-h-[85vh] pb-40 md:pb-10 md:px-2'>
                                {kb?.chats && kb.chats.length > 0 && (
                                <ChatsList
                                        chats={kb.chats}
                                        kbId={kb.id}
                                    />
                            )}
                            </div>

                            {kb?.chats && kb.chats.length === 0 && (
                                <ChatsEmpty />
                            )}
                        </TabPanel>
                    </TabPanels>
                </TabGroup>

            </div>
            <StickyManagementContainer kbId={kb.id} />
        </div>
    )
}
