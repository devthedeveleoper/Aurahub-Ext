import React from 'react';

export default function SkeletonCard() {
  return (
    <div className="bg-white dark:bg-gray-700 rounded-xl shadow-md animate-pulse transition duration-300">
      <div className="h-48 bg-gray-200 dark:bg-gray-600 rounded-t-xl"></div>
      <div className="p-4 space-y-2">
        <div className="h-4 bg-gray-300 dark:bg-gray-500 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-500 rounded w-1/2"></div>
      </div>
    </div>
  );
}
