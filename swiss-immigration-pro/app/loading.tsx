import { CardSkeleton, ArticleSkeleton } from '@/components/ui/LoadingSkeleton'

export default function Loading() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="animate-pulse space-y-8">
          {/* Header Skeleton */}
          <div className="space-y-4">
            <div className="h-10 bg-gray-200 rounded w-1/4"></div>
            <div className="h-8 bg-gray-200 rounded w-1/2"></div>
          </div>
          
          {/* Content Skeleton */}
          <ArticleSkeleton />
          
          {/* Cards Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </div>
        </div>
      </div>
    </div>
  )
}


















