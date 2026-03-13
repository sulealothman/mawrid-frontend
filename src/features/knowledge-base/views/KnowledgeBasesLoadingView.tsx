import ShimmerLine from '@/features/shared/components/shimmer/ShimmerLine'
import KnowledgeBaseSkeleton from '../loaders/KnowledgeBaseSkeleton'

export default function KnowledgeBasesLoadingView() {
    return (
        <div className="w-full font-mixed">
            <div className='max-w-6xl mx-auto px-6 py-8'>
                <div className="flex justify-between items-center mb-8 animate-pulse">
                    <div>
                        <h1 className="text-3xl font-bold text-primary mb-2">
                            <ShimmerLine className="w-48" />
                        </h1>
                        <p className="text-secondary">
                            <ShimmerLine className="w-64" />
                        </p>
                    </div>

                    <ShimmerLine className="w-32 h-10" />
                </div>
                <div className="space-y-3">
                    {Array.from({ length: 10 }).map((_, i) => (
                    <KnowledgeBaseSkeleton key={i} />
                ))}
                </div>
                
            </div>
        </div>
    )
}
