interface DividerProps {
  className?: string;
}

export default function Divider({ className = '' }: DividerProps) {
  return (
    <div className={`border-t my-4 border-secondary duration-300 ${className && className}`} />
  )
}
