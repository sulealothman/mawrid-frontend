import { cn } from "../../utils/utils";

interface ShimmerLineProps {
    className?: string;
}

export default function ShimmerLine({className = ''}: ShimmerLineProps) {
  return (
    <div className={cn("h-5 w-1/2 bg-tertiary rounded-md mb-3 animate-pulse", className)}></div>
  )
}
