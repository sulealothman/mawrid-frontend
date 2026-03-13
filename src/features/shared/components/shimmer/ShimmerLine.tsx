import { cn } from "../../utils/utils";

interface ShimmerLineProps {
    className?: string;
}

export default function ShimmerLine({className = ''}: ShimmerLineProps) {
  return (
    <div className={cn("h-5 w-1/2 bg-neutral-300 dark:bg-neutral-700 rounded-md mb-3 animate-pulse", className)}></div>
  )
}
