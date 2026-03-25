import { UserAvatarIcon } from '@/features/shared/icons/CommonIcons';
import { useState } from 'react'

interface UserAvatarProps {
    avatar?: string;
    name: string;
    hideName?: boolean;
}

export default function UserAvatar({
    avatar,
    name,
    hideName = false
}: UserAvatarProps) {
    const [isErrorLoading, setIsErrorLoading] = useState(false);
    return (
        <div className="p-4 flex items-center gap-3 overflow-hidden w-full">
            <div className="size-7 bg-tertiary rounded-full flex items-center justify-center">
                {avatar && !isErrorLoading ? (
                    <img
                        src={avatar}
                        alt="User Avatar"
                        onError={() => setIsErrorLoading(true)}
                        className="size-6 shrink-0 rounded-full object-cover"
                    />
                ) : (
                    <UserAvatarIcon
                        viewBox="0 0 20 24"
                        className="size-6 shrink-0 fill-secondary"
                    />
                )}
            </div>

            {!hideName && (<div className="flex-1 min-w-0">
                <div className="text-sm text-start font-medium text-primary truncate font-noto-sans-arabic">
                    {name}
                </div>
            </div>)}
        </div>
    )
}
