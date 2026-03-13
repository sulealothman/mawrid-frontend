import React from 'react'

interface SmallBadgeProps {
    text: string;
}

export default function SmallBadge({ text }: SmallBadgeProps) {
  return (
    <div className="inline-block bg-gray-200 text-gray-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-xl">
      {text}
    </div>
  )
}
