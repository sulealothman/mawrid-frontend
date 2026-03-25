import React from 'react';
import { useI18n } from '@/features/localization/hooks/useI18n';
import Logo from '@/features/navbar/components/Logo';
import { SidebarIcon } from '../icons/SidebarIcon';

interface SidebarHeaderProps {
  isCollapse: boolean;
  onCloseSidebar: () => void;
}

export const SidebarHeader: React.FC<SidebarHeaderProps> = ({ isCollapse, onCloseSidebar }) => {
  const { t } = useI18n();

  const [isHovering, setIsHovering] = React.useState(false);

  return (
    <div className={`sidebar-header ${isCollapse ? 'max-md:border-0' : ''}`}>
      <div className="flex items-center justify-between">
        <div className='flex items-center gap-2' onMouseEnter={() => isCollapse && setIsHovering(true)} onMouseLeave={() => isCollapse && setIsHovering(false)}>
          {isCollapse && isHovering && <SidebarIcon viewBox='0 0 24 24' className='size-5 stroke-primary cursor-pointer rtl:rotate-180' onClick={onCloseSidebar} />}
          {isCollapse && !isHovering && <Logo className="size-5" />}
          {!isCollapse && <Logo className="size-5" />}
          {!isCollapse && <h2 className="text-lg font-semibold font-mixed">{t('app_name')}</h2>}
        </div>

        {!isCollapse && (
          <SidebarIcon
            viewBox='0 0 24 24'
            className='size-5 stroke-primary cursor-pointer rtl:rotate-180'
            onClick={onCloseSidebar}
          />
        )}
      </div>
    </div>
  );
};