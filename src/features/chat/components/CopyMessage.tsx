import { useState } from 'react'
import { CopyIcon } from '../icons/ChatIcons';
import { CheckIcon } from '@/features/shared/icons/CommonIcons';

interface CopyMessageProps {
    contentRef: React.RefObject<HTMLDivElement | null>;
}

export default function CopyMessage({ contentRef }: CopyMessageProps) {

    const [isCopied, setIsCopied] = useState(false);

    const copyHandle = async () => {
        try {
            if (contentRef?.current) {
                await navigator.clipboard.writeText(contentRef.current.innerText);
                setIsCopied(true);
                setTimeout(() => {
                    setIsCopied(false);
                }, 700);
            }
        } catch { }
    }

    if (isCopied)
        return (
            <CheckIcon
                className='size-5 stroke-tertiary'
                strokeClassName='stroke-2'
                viewBox='0 0 24 24'
            />
        );

    return (
        <CopyIcon
            onClick={copyHandle}
            viewBox='0 0 24 24'
            strokeClassName='stroke-[1.5px]'
            className='size-5 stroke-muted cursor-pointer'
        />
    )
}
