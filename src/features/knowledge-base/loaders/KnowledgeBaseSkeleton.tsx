import ShimmerLine from "@/features/shared/components/shimmer/ShimmerLine";

const KnowledgeBaseSkeleton = () => {
  return (
    <div
      className="bg-neutral-100 dark:bg-neutral-900 shadow-md border border-neutral-300/50 dark:border-neutral-700/50 rounded-lg p-4 transition-colors cursor-pointer"
    >
      <div className="rounded-lg">
        <ShimmerLine  className="w-1/3" />
        <ShimmerLine className="w-1/4" />
      </div>
    </div>

  );
};

export default KnowledgeBaseSkeleton;