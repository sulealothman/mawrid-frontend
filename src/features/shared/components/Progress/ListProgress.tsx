import React from 'react'
import LineProgress from './LineProgress';



interface ListProgressProps {
    listProgress: LineProgressType[];
    cancelHandler?: (id: string) => void;
}

export default function ListProgress({ listProgress, cancelHandler }: ListProgressProps) {
  return (
    <div className='flex flex-col'>
        {listProgress.map(item => (
            <LineProgress key={item.id} progress={item} cancelHandler={cancelHandler} />
        ))}
    </div>
  )
}
