import React from 'react';

const CategoryCardSkeleton = () => {
  return (
    <div className="w-[220px] h-[120px] bg-white rounded-2xl flex flex-col items-center justify-center p-4">
      {/* Icon Skeleton */}
      <div className="w-12 h-12 bg-gray-300 rounded-full"></div>

      {/* Category Name Skeleton */}
      <div className="w-24 h-4 mt-3 bg-gray-300 rounded-md"></div>
    </div>
  );
};

export default CategoryCardSkeleton;
