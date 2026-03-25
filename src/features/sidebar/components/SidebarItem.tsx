import React from 'react'

interface SidebarItemProps {
    title: string;
    icon: React.ReactNode;
    onClick: () => void;
    isCollapse: boolean;
    isActive?: boolean;
}

export default function SidebarItem({ title, icon, onClick, isCollapse, isActive }: SidebarItemProps) {
    return (
        <div className={`flex gap-2 items-center group cursor-pointer rounded-lg px-1 py-2 text-sm transition-colors text-primary ${isActive && !isCollapse
          ? 'bg-secondary'
          : 'hover:bg-secondary'
        }`} onClick={onClick}>
            <div className={`p-1 rounded-lg ${isActive ? 'bg-tertiary' : 'bg-secondary group-hover:bg-tertiary'} rounded-full`}>{icon}</div>
            {!isCollapse && <h3 className='sidebar-item font-mixed'>{title}</h3>}
        </div>
    )
}
