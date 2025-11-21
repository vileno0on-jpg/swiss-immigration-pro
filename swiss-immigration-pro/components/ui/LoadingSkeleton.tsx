export function CardSkeleton() {
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg animate-pulse">
      <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
      <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-5/6 mb-4"></div>
      <div className="h-10 bg-gray-200 rounded w-1/3"></div>
    </div>
  )
}

export function ArticleSkeleton() {
  return (
    <div className="bg-white rounded-xl p-8 shadow-lg animate-pulse space-y-4">
      <div className="h-8 bg-gray-200 rounded w-1/2"></div>
      <div className="h-4 bg-gray-200 rounded w-full"></div>
      <div className="h-4 bg-gray-200 rounded w-full"></div>
      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      <div className="h-64 bg-gray-200 rounded mt-6"></div>
      <div className="h-4 bg-gray-200 rounded w-full mt-4"></div>
      <div className="h-4 bg-gray-200 rounded w-full"></div>
      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
    </div>
  )
}

