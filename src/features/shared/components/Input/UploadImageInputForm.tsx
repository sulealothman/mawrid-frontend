import React, { useState } from 'react'
import { UserAvatarIcon } from '../../icons/CommonIcons';

interface UploadImageInputFormProps {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    avatar: string;
}

export default function UploadImageInputForm({
    onChange,
    avatar,
}: UploadImageInputFormProps) {
    const [isErrorLoading, setIsErrorLoading] = useState(false);

    return (
        <div className='flex flex-col gap-2'>
            <label htmlFor="file-input" className='cursor-pointer'>
                {avatar && !isErrorLoading ? (
                    <img src={avatar} alt="User Avatar" className='min-w-16 w-16 h-16 md:w-32 md:h-32 shrink-0 rounded-full object-cover transition-all duration-300' onError={() => setIsErrorLoading(true)} />
                ) : (
                    <UserAvatarIcon viewBox='0 0 20 24' className="size-16 md:size-32 border border-tertiary rounded-full fill-primary bg-tertiary dark:bg-secondary" />
                )}
            </label>
            <input type="file" id="file-input" className='hidden' onChange={onChange} accept="image/png, image/jpeg, image/jpg" />
        </div>
    )
}
