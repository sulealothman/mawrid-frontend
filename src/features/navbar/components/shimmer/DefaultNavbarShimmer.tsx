import ShimmerLine from '@/features/shared/components/shimmer/ShimmerLine';

export default function DefaultNavbarShimmer() {
    return (
        <div className='flex items-center justify-between px-4 py-2 shadow-md dark:shadow-lg'>
            <ShimmerLine className="w-20 h-6" />
            <ShimmerLine className="w-32 h-8" />
            <div></div>
        </div>
    )
}
