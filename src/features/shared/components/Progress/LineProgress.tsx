import React from 'react'
import { CloseIcon } from '../../icons/CommonIcons';
import Button from '../Button/Button';

interface LineProgressProps {
    progress: LineProgressType;
    cancelHandler?: (id: string) => void;
}

export default function LineProgress({ progress, cancelHandler }: LineProgressProps) {
    return (
        <div key={progress.id} className='flex items-center gap-2 mb-2'>
            <span className='text-primary text-start w-40 truncate'>{progress.name}</span>
            <div className='flex-1 bg-tertiary rounded-full h-4'>
                <div
                    className='bg-muted h-4 rounded-full'
                    style={{ width: `${progress.progress}%` }}
                ></div>
            </div>
            <span className='text-primary w-4'>{progress.progress}%</span>
            {cancelHandler && (
                <Button
                    onClick={() => cancelHandler(progress.id)}
                    className='transition-colors'
                    variant='noStyle'
                >
                    <CloseIcon className='stroke-danger size-4' strokeClassName='stroke-2' viewBox='0 0 24 24' />
                </Button>
            )}
        </div>
    )
}
