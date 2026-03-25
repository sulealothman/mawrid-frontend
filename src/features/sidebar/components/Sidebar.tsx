import { motion } from 'framer-motion';
import { SidebarHeader } from './SidebarHeader';
import KBaseList from './KBaseList';
import useKnowledgeBasesFetch from '@/features/knowledge-base/hooks/useKnowledgeBasesFetch';
import { KBStore } from '@/features/knowledge-base/store/KBStore';
import useRedirect from '@/features/shared/hooks/useRedirect';
import UserDropdown from '@/features/users/components/Dropdown/UserDropdown';
import { useI18n } from '@/features/localization/hooks/useI18n';
import SidebarItem from './SidebarItem';
import Divider from '@/features/shared/components/Divider';
import { HomeIcon } from '@/features/home/icons/HomeIcon';
import useSidebar from '../hooks/useSidebar';

export default function Sidebar() {
  const { t } = useI18n();

  const { isCollapse, handleClose } = useSidebar();

  const {
    pathname,
    redirectToHome,
    redirectToKnowledgeBase
  } = useRedirect();

  const { kbs } = useKnowledgeBasesFetch();
  const { kb_id, setKbId } = KBStore();

  const onSelectKBase = (id: string) => {
    setKbId(id);
    redirectToKnowledgeBase(id);
  }

  const toHome = () => {
    setKbId("");
    redirectToHome();
  }

  return (
    <motion.nav
      className={`sidebar ${isCollapse ? 'sidebar-collapse items-center w-16' : 'w-64'}`}
      layout
    >
      <SidebarHeader isCollapse={isCollapse} onCloseSidebar={handleClose} />
      <div className={`${isCollapse ? 'hidden md:flex items-center' : 'flex'} flex-col flex-1 justify-between`}>
        <div className='flex flex-col gap-4 py-4 px-2'>

          <SidebarItem
            title={t('home')}
            icon={
              <HomeIcon className="size-5 stroke-primary" viewBox='0 0 24 24' />
            }
            onClick={toHome}
            isCollapse={isCollapse}
            isActive={pathname === "/home"}
          />
        </div>
        <Divider className='mx-2' />

        {!isCollapse && kbs && kbs.data.length > 0 && (
          <>
            <KBaseList
              kbList={kbs}
              activeKbId={kb_id}
              onSelectKBase={onSelectKBase}
            />
          </>
        )}
        <Divider className='mx-2 mb-0' />

        <div className="mt-auto">
          <UserDropdown isCollapse={isCollapse} />
        </div>
      </div>
    </motion.nav>

  );
};