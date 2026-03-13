import ShimmerLine from "@/features/shared/components/shimmer/ShimmerLine";


interface ChatMessagesSkeletonProps {
  align?: "start" | "end";
}


const ChatMessagesSkeleton = ({ align = "start" }: ChatMessagesSkeletonProps) => {
  return (
    <div
      className="transition-colors cursor-pointer"
    >
      <div className={`rounded-lg flex gap-4 items-start ${
          align === "end" ? "flex-row-reverse justify-start" : "justify-end"
        }`}>
          {align === "end" && <ShimmerLine className="w-8 h-8 rounded-full" />}
        <ShimmerLine className="w-1/3 h-16" />

        {align === "start" && <ShimmerLine className="w-8 h-8 rounded-full" />}
      </div>
    </div>

  );
};

export default ChatMessagesSkeleton;