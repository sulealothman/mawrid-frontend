import ShimmerLine from "@/features/shared/components/shimmer/ShimmerLine";

const KnowledgeBaseSkeleton = () => {
  return (
    <div
      className="bg-accent shadow-md border border-secondary rounded-lg p-4 transition-colors cursor-pointer"
    >
      <div className="rounded-lg">
        <ShimmerLine  className="w-1/3" />
        <ShimmerLine className="w-1/4" />
      </div>
    </div>

  );
};

export default KnowledgeBaseSkeleton;