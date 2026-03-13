interface DividerProps {
  className?: string;
}

export default function Divider({ className = '' }: DividerProps) {
  return (
    <div className={`border-t my-4 border-neutral-200 dark:border-neutral-500 duration-300 ${className && className}`} />
  )
}
