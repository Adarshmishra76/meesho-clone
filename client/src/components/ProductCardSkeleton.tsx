const ProductCardSkeleton = () => {
    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden flex flex-col h-full animate-pulse">
            {/* Image Skeleton */}
            <div className="relative pt-[100%] bg-gray-200 skeleton"></div>

            {/* Content Skeleton */}
            <div className="p-3 flex flex-col flex-1 gap-2">
                {/* Category */}
                <div className="h-3 bg-gray-200 rounded w-1/3 skeleton"></div>

                {/* Title - 2 lines */}
                <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded skeleton"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6 skeleton"></div>
                </div>

                {/* Price */}
                <div className="flex items-center gap-2 mt-1">
                    <div className="h-5 bg-gray-200 rounded w-16 skeleton"></div>
                    <div className="h-4 bg-gray-200 rounded w-12 skeleton"></div>
                </div>

                {/* Rating */}
                <div className="h-5 bg-gray-200 rounded w-16 skeleton"></div>

                {/* Buttons */}
                <div className="mt-auto grid grid-cols-2 gap-2 pt-2">
                    <div className="h-9 bg-gray-200 rounded skeleton"></div>
                    <div className="h-9 bg-gray-200 rounded skeleton"></div>
                </div>
            </div>
        </div>
    );
};

export default ProductCardSkeleton;
