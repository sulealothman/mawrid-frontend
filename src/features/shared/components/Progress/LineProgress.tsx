import React from 'react'

interface LineProgressProps {
    progress: LineProgressType;
    cancelHandler?: (id: string) => void;
}

export default function LineProgress({ progress, cancelHandler }: LineProgressProps) {
    return (
        <div key={progress.id} className='flex items-center gap-2 mb-2'>
            <span className='text-primary text-start w-40 truncate'>{progress.name}</span>
            <div className='flex-1 bg-neutral-300 rounded-full h-4'>
                <div
                    className='bg-neutral-500 h-4 rounded-full'
                    style={{ width: `${progress.progress}%` }}
                ></div>
            </div>
            <span className='text-primary w-4'>{progress.progress}%</span>
            {cancelHandler && (
                <button
                    onClick={() => cancelHandler(progress.id)}
                    className='text-red-500 hover:text-red-700 transition-colors'
                >
                    Cancel
                </button>
            )}
        </div>
    )
}
