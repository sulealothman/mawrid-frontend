import React from 'react'

interface SidebarItemProps {
    title: string;
    icon: React.ReactNode;
    onClick: () => void;
    isCollapse: boolean;
}

export default function SidebarItem({ title, icon, onClick, isCollapse }: SidebarItemProps) {
    return (
        <div className='flex gap-2 cursor-pointer' onClick={onClick}>
            <div>{icon}</div>
            {!isCollapse && <h3 className='sidebar-item font-mixed'>{title}</h3>}
        </div>
    )
}
