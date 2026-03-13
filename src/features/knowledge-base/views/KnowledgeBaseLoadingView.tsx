import ShimmerLine from '@/features/shared/components/shimmer/ShimmerLine'
import KnowledgeBaseSkeleton from '../loaders/KnowledgeBaseSkeleton'
import DefaultNavbarShimmer from '@/features/navbar/components/shimmer/DefaultNavbarShimmer'

export default function KnowledgeBaseLoadingView() {
    return (
        <div className="w-full font-mixed">
            <DefaultNavbarShimmer />
            <div className='mx-auto px-4 py-4'>
                <div className="flex gap-4 items-center pt-6 py-4">
                    <ShimmerLine className="w-20 h-6" />
                    <ShimmerLine className="w-20 h-6" />
                </div>
                <div className="space-y-3">
                    <ShimmerLine className="w-full h-40 rounded-2xl!" />
                    {Array.from({ length: 10 }).map((_, i) => (
                        <KnowledgeBaseSkeleton key={i} />
                    ))}
                </div>

            </div>
        </div>
    )
}
