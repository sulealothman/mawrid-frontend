import { motion } from 'framer-motion'
import ShimmerLine from '@/features/shared/components/shimmer/ShimmerLine';
import DefaultNavbarShimmer from '@/features/navbar/components/shimmer/DefaultNavbarShimmer';
import ChatMessagesSkeleton from '../loaders/ChatMessagesSkeleton';

export default function ChatLoadingView() {
  return (
    <motion.div
      className="flex-1 flex flex-col"
      animate={{
        marginLeft: 0,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
    >
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <div className="shrink-0">
          <DefaultNavbarShimmer />
        </div>

        <div className="flex-1 overflow-hidden flex flex-col gap-4 p-4 w-full max-w-4xl mx-auto">
          {Array.from({ length: 4 }).map((_, i) => (
            <ChatMessagesSkeleton
              key={i}
    align={i % 2 === 0 ? "start" : "end"}
            />
          ))}
        </div>
        <div className="shrink-0 max-w-4xl w-full mx-auto p-4">
          <ShimmerLine className="w-full h-10 rounded-2xl!" />
        </div>
      </div>
    </motion.div>
  )
}
